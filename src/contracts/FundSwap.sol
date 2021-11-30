pragma solidity >0.5.0;

import "./CbToken.sol";

contract FundSwap{
    string public name = "Fund Swap";
    uint public rate = 20;
    CbToken public cbToken;

    constructor (CbToken _cbToken) public{
        cbToken = _cbToken;
    }

    event TokenPurchased(
        address receiverAccount,
        address cbToken,
        address fundSwap,
        uint256 amount,
        uint rate
    );

    function buycbTokens() public payable{
        // 1 ether = 20 CB Tokens
        // calculating the number of CB tokens tokens to buy
        uint256 tokens = msg.value * rate;

        // checking there is enough of CB tokens to buy
        require( cbToken.balanceOf(address(this)) >= tokens);

        // transfering the tokens to the address
        cbToken.transfer(msg.sender, tokens);

        // emit and event to check and test the transfer
        emit TokenPurchased(msg.sender,address(cbToken),address(this),tokens,rate);

    }

}