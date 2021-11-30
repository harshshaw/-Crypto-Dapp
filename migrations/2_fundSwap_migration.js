const CbToken = artifacts.require("CbToken");

module.exports = async function (deployer) {
    // deploying our erc20 token
    await deployer.deploy(CbToken);
};
