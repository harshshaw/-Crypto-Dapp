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

        let result;
        before(async()=>{
            // token purchasing at a fixed rate from ether to cb tokens
            result = await fundSwap.buycbTokens({from: accounts[2], value: tokens('10')})
            // console.log(result.logs[0].args.amount.toString());
        })

        it('token purchasing details', async()=>{

            // checking investor balance
            const investorBalance = await cbToken.balanceOf(accounts[2]);
            assert.equal(investorBalance, tokens('200'));

            // checking FundSwap balance and token balance
            const fundSwapTokenBalance = await cbToken.balanceOf(fundSwap.address);
            assert.equal(fundSwapTokenBalance,tokens('99999800'))

            const fundSwapBalance = await web3.eth.getBalance(fundSwap.address)
            // console.log(ethSwapBalance)
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
    })

    describe('CB token selling = sellcbTokens()', async() =>{

        let result;
        before(async()=>{
            // approving Fund Swap to sell the tokens from the accounts

            await cbToken.approve(fundSwap.address,tokens('500'),{from : accounts[2]});
            // token selling at a fixed rate
            result = await fundSwap.sellcbTokens(tokens('150'),{from:accounts[2]});
            // console.log(result.logs[0].args.amount.toString());
        })

        it('token selling details', async()=>{

            // checking investor balance
            const investorBalance = await cbToken.balanceOf(accounts[2]);
            assert.equal(investorBalance, tokens('50'));

            // checking FundSwap balance and token balance
            const fundSwapTokenBalance = await cbToken.balanceOf(fundSwap.address);
            assert.equal(fundSwapTokenBalance,tokens('99999950'))

            const fundSwapBalance = await web3.eth.getBalance(fundSwap.address)
            // console.log(fundSwapBalance)
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
            const result = await fundSwap.createProject(tokens('40'),{from:accounts[1]});

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
        let result,projCount
        before(async()=>{
            // approving Fund Swap to sell the tokens from the accounts

            await cbToken.approve(fundSwap.address,tokens('500'),{from : accounts[2]});
            // token selling at a fixed rate
            result = await fundSwap.donate(1,accounts[1],tokens('20'),{from:accounts[2]});
            // console.log(result);
            // console.log(result.logs[0].args.amount.toString());
            // getting the project count
            projCount = await fundSwap.totalProject();
        })
        it('donated to a project successfully but goal not completed', async () => {
            const event = result.logs[0].args;
            // console.log(event)
            assert.equal(await cbToken.balanceOf(accounts[2]),tokens('180'));
            assert.equal(await cbToken.balanceOf(accounts[1]),tokens('20'));
            assert.equal(event.creator,accounts[1]);
            assert.equal(event.id,1);
            assert.equal(event.amount.toString(),tokens('20'));
            const proj = await fundSwap.projects(projCount);
            assert.equal(proj.creator, accounts[1]);
            assert.equal(proj.goal, tokens('40'));
            assert.equal(proj.currentAmount, tokens('20'));
            assert.equal(proj.goalCompleted, false);
            assert.equal(proj.investorRewarded, false);
        })
        it('donated to a project successfully but goal completed', async () => {

            // before donating again current balance is 180
            assert.equal(await cbToken.balanceOf(accounts[2]),tokens('180'));
            result = await fundSwap.donate(1,accounts[1],tokens('20'),{from:accounts[2]});
            const event = result.logs[0].args;
            // console.log(event)
            // after donation the balance will reduce to 160 than again
            // for goal completing the balance will be 220
            assert.equal(await cbToken.balanceOf(accounts[2]),tokens('220'));
            assert.equal(await cbToken.balanceOf(accounts[1]),tokens('40'));
            assert.equal(event.creator,accounts[1]);
            assert.equal(event.id,1);
            assert.equal(event.amount.toString(),tokens('20'));
            const proj = await fundSwap.projects(projCount);
            assert.equal(proj.creator, accounts[1]);
            assert.equal(proj.goal, tokens('40'));
            assert.equal(proj.currentAmount, tokens('40'));
            assert.equal(proj.goalCompleted, true);
            assert.equal(proj.investorRewarded, true);
        })
    })
})