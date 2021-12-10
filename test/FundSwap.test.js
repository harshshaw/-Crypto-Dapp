const { assert } = require('chai');

const CbToken = artifacts.require("CbToken");
const FundSwap = artifacts.require("FundSwap");

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}


// account 0 -> owner
// account 1 -> creator
// account 2 -> investor
contract('FundSwap', (accounts)=>{

    let cbToken, fundSwap;
    // before it test we need to get the deployed version of the contract
    before(async ()=>{

        cbToken = await CbToken.new();
        fundSwap = await FundSwap.new(cbToken.address);
        // transfering all the CB Token to FundSwap
        await cbToken.transfer(fundSwap.address,tokens('100000000'));
    })
    describe('CB Token deployment',async ()=>{
        it('Token has a name and symbol', async()=>{
            const name = await cbToken.name();
            const symbol = await cbToken.symbol();
            assert.equal(name,'CB Token');
            assert.equal(symbol,'CB');
        })
        it('CB token deployed successfully and transfered fund to FundSwap contract',async()=>{
            const balance = await cbToken.balanceOf(fundSwap.address);
            assert.equal(balance,tokens('100000000'));
        })
        
    })

    describe('CB token purchasing = buycbTokens()', async() =>{

        let result, result2;
        before(async()=>{
            // token purchasing at a fixed rate from account 2 with ether to cb tokens
            result = await fundSwap.buycbTokens({from: accounts[2], value: tokens('10')})
            
        })

        it('token purchasing details for account 2', async()=>{

            // checking investor balance
            const investorBalance = await cbToken.balanceOf(accounts[2]);
            assert.equal(investorBalance, tokens('200'));

            // checking FundSwap balance and token balance
            const fundSwapTokenBalance = await cbToken.balanceOf(fundSwap.address);
            assert.equal(fundSwapTokenBalance.toString(),tokens('99999800'))

            // checking the balance of fund swap contract
            const fundSwapBalance = await web3.eth.getBalance(fundSwap.address)
            assert.equal(fundSwapBalance.toString(), tokens('10'))

            // event emitted to check all transaction details was correct
            const event = result.logs[0].args;
            // checking transaction details
            assert.equal(event.receiverAccount,accounts[2]);
            assert.equal(event.cbToken, cbToken.address);
            assert.equal(event.fundSwap,fundSwap.address);
            assert.equal(event.amount.toString(),tokens('200'));
            assert.equal(event.rate.toString(),'20');
        })

        it('token purchasing details for account 3', async()=>{
            // purchasing Cb token from account 3
            result2 = await fundSwap.buycbTokens({from: accounts[3], value: tokens('10')})

            // checking investor balance
            const investorBalance = await cbToken.balanceOf(accounts[3]);
            assert.equal(investorBalance, tokens('200'));

            // checking FundSwap balance and token balance
            const fundSwapTokenBalance = await cbToken.balanceOf(fundSwap.address);
            assert.equal(fundSwapTokenBalance,tokens('99999600'))

            // checking the balance of fund swap contract
            const fundSwapBalance = await web3.eth.getBalance(fundSwap.address)
            assert.equal(fundSwapBalance.toString(), tokens('20'))

            // event emitted to check all transaction details was correct
            const event = result2.logs[0].args;
            // checking transaction details
            assert.equal(event.receiverAccount,accounts[3]);
            assert.equal(event.cbToken, cbToken.address);
            assert.equal(event.fundSwap,fundSwap.address);
            assert.equal(event.amount.toString(),tokens('200'));
            assert.equal(event.rate.toString(),'20');
        })
    })

    describe('CB token selling = sellcbTokens()', async() =>{

        let result;
        before(async()=>{

            // approving Fund Swap to sell the tokens from the accounts
            await cbToken.approve(fundSwap.address,tokens('500'),{from : accounts[2]});
            // token selling at a fixed rate
            result = await fundSwap.sellcbTokens(tokens('150'),{from:accounts[2]});
        })

        it('token selling details', async()=>{

            // checking investor balance
            const investorBalance = await cbToken.balanceOf(accounts[2]);
            assert.equal(investorBalance, tokens('50'));

            // checking FundSwap balance and token balance
            const fundSwapTokenBalance = await cbToken.balanceOf(fundSwap.address);
            assert.equal(fundSwapTokenBalance,tokens('99999950'))
            
            // checking the balance of fund swap contract
            const fundSwapBalance = await web3.eth.getBalance(fundSwap.address)
            assert.equal(fundSwapBalance.toString(), tokens('2.5'))

            // event emitted to check all transaction details was correct
            const event = result.logs[0].args;
            // checking transaction details
            assert.equal(event.receiverAccount,fundSwap.address);
            assert.equal(event.cbToken, cbToken.address);
            assert.equal(event.senderAccount,accounts[2]);
            assert.equal(event.amount.toString(),tokens('150'));
            assert.equal(event.rate.toString(),'20');
            assert.equal(event.etherAmount.toString(),tokens('7.5'));

            // checking for investor can sell more tokens than he has currently
            await fundSwap.sellcbTokens(tokens('150'),{from:accounts[2]}).should.be.rejected;

        })
    })

    describe('Project creation = createProject()', async() =>{

        it('project successfully created', async()=>{
            // create project
            const result = await fundSwap.createProject("Empowering agriculture","nothing","xyz",tokens('40'),{from:accounts[1]});

            // getting the total project
            const projCount = await fundSwap.totalProject();
            assert.equal(projCount.toString(),'1');

            // checking emitted event 
            const event = result.logs[0].args;
            assert.equal(event.creator, accounts[1]);
            assert.equal(event.goal, tokens('40'));
            assert.equal(event.currentAmount, tokens('0'));
            assert.equal(event.goalCompleted, false);
            assert.equal(event.investorRewarded, false);

        })
    })

    describe('project donation = donate()', async ()=>{
        let result,projCount, result2
        before(async()=>{

            // approving Fund Swap to sell the tokens from the accounts
            await cbToken.approve(fundSwap.address,tokens('500'),{from : accounts[2]});
            await cbToken.approve(fundSwap.address,tokens('500'),{from : accounts[3]});
            // token selling at a fixed rate from account 2
            result = await fundSwap.donate(1,accounts[1],tokens('20'),{from:accounts[2]});
            // getting the project count
            projCount = await fundSwap.totalProject();
        })
        it('donated to a project successfully from account 2 but goal not completed', async () => {

            // checking the event emmitted
            const event = result.logs[0].args;
            // checking for balance of CB token
            assert.equal(await cbToken.balanceOf(accounts[2]),tokens('180'));
            assert.equal(await cbToken.balanceOf(accounts[1]),tokens('20'));
            // event checking
            assert.equal(event.creator,accounts[1]);
            assert.equal(event.id,1);
            assert.equal(event.amount.toString(),tokens('20'));
            // checking the project details updated or not
            const proj = await fundSwap.projects(projCount);
            assert.equal(proj.creator, accounts[1]);
            assert.equal(proj.goal, tokens('40'));
            assert.equal(proj.currentAmount, tokens('20'));
            assert.equal(proj.goalCompleted, false);
            assert.equal(proj.investorRewarded, false);

            // checking the amount donated for the addresses from account 2
            assert.equal(await fundSwap.amountDonated(accounts[1],accounts[2]),tokens('20'));

            // checking the reward receive status for the addresses of account 2
            assert.equal(await fundSwap.rewardReceived(accounts[1],accounts[2]),false);
        })
        it('donated to a project successfully from account 2 and account 3 but goal completed', async () => {

            // before donating again current balance of account 2 is 180
            assert.equal(await cbToken.balanceOf(accounts[2]),tokens('180'));

            // before donating again current balance of account 3 is 200
            assert.equal(await cbToken.balanceOf(accounts[3]),tokens('200'));

            // donated via account 2
            result = await fundSwap.donate(1,accounts[1],tokens('10'),{from:accounts[2]});
            
            // event emmitted for account 2
            const event = result.logs[0].args;
            // checking balance of CB tokens
            // after donation the balance will reduce to 170 than again
            // for goal completing the balance will be 171.2
            assert.equal(await cbToken.balanceOf(accounts[2]),tokens('170'));
            assert.equal(await cbToken.balanceOf(accounts[1]),tokens('30'));
            // event checking
            assert.equal(event.creator,accounts[1]);
            assert.equal(event.id,1);
            assert.equal(event.amount.toString(),tokens('10'));
            
            // checking the project details updated or not
            const proj = await fundSwap.projects(projCount);
            assert.equal(proj.creator, accounts[1]);
            assert.equal(proj.goal, tokens('40'));
            assert.equal(proj.currentAmount, tokens('30'));
            assert.equal(proj.goalCompleted, false);
            assert.equal(proj.investorRewarded, false);


            // donated via account 3
            result2 = await fundSwap.donate(1,accounts[1],tokens('10'),{from:accounts[3]});
            // event emmitted for account 3
            const event2 = result2.logs[0].args;
            // after donation the balance will reduce to 190 than again
            // for goal completing the balance will be 190.4
            assert.equal(await cbToken.balanceOf(accounts[3]),tokens('190.4'));
            assert.equal(await cbToken.balanceOf(accounts[1]),tokens('40'));
            assert.equal(event2.creator,accounts[1]);
            assert.equal(event2.id,1);
            assert.equal(event2.amount.toString(),tokens('10'));
            
            // checking the project details updated or not
            const proj2 = await fundSwap.projects(projCount);
            assert.equal(proj2.creator, accounts[1]);
            assert.equal(proj2.goal, tokens('40'));
            assert.equal(proj2.currentAmount, tokens('40'));
            assert.equal(proj2.goalCompleted, true);
            assert.equal(proj2.investorRewarded, true);
            
            // checking the rewarded amount for the addresses from account 2
            assert.equal(await fundSwap.addressReward(accounts[1],accounts[2]),tokens('1.2'));

            // checking the rewarded amount for the addresses from account 3
            assert.equal(await fundSwap.addressReward(accounts[1],accounts[3]),tokens('0.4'));

            // checking the amount donated for the addresses from account 2
            assert.equal(await fundSwap.amountDonated(accounts[1],accounts[2]),tokens('30'));

            // checking the amount donated for the addresses from account 3
            assert.equal(await fundSwap.amountDonated(accounts[1],accounts[3]),tokens('10'));

            // checking the reward receive status for the addresses of account 2
            assert.equal(await fundSwap.rewardReceived(accounts[1],accounts[2]),true);

            // checking the reward receive status for the addresses of account 3
            assert.equal(await fundSwap.rewardReceived(accounts[1],accounts[3]),true);
        })
    })
})