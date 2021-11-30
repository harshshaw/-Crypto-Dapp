const CbToken = artifacts.require("CbToken");
const FundSwap = artifacts.require("FundSwap");

module.exports = async function (deployer) {
    // deploying our erc20 token
    await deployer.deploy(CbToken);
    // getting the deployed form of the contract
    const cbToken = await CbToken.deployed();

    // deploying Fund Swap contract
    await deployer.deploy(FundSwap,cbToken.address);
    // getting the deployed version of the contract
    const fundSwap = await FundSwap.deployed();

    // transfering all the CB Token to FundSwap
    await cbToken.transfer(fundSwap.address,'100000000000000000000000000');

};
