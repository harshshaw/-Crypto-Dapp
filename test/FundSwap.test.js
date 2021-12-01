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
            // token purchasing at a fixed rate
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
})