const CbToken = artifacts.require("CbToken");
const FundSwap = artifacts.require("FundSwap");

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('FundSwap', (accounts)=>{

    let cbToken, fundSwap;
    // before it test we need to get the deployed version of the contract
    before(async ()=>{

        cbToken = await CbToken.new();
        fundSwap = await FundSwap.deployed();
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
})