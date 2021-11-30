pragma solidity >0.5.0;

import "./CbToken.sol";

contract FundSwap{
    string public name = "Fund Swap";
    CbToken public cbToken;

    constructor (CbToken _cbToken) public{
        cbToken = _cbToken;
    }
}