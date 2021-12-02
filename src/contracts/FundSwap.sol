pragma solidity >0.5.0;

import "./CbToken.sol";

contract FundSwap{
    string public name = "Fund Swap";
    uint public rate = 20;
    CbToken public cbToken;
    uint public totalProject = 0;


    struct Project{
        address creator;
        uint goal;
        uint currentAmount;
        bool goalCompleted;
        bool investorRewarded;   
    }
    mapping( uint =>Project) public projects;

    constructor (CbToken _cbToken) public{
        cbToken = _cbToken;
    }

    
    // event for token purchasing
    event TokenPurchased(
        address receiverAccount,
        address cbToken,
        address fundSwap,
        uint256 amount,
        uint rate
    );

    // event for token selling
    event TokenSold(
        address receiverAccount,
        address cbToken,
        address senderAccount,
        uint256 amount,
        uint rate,
        uint etherAmount
    );

    // event for project creation
    event ProjectCreate(
        address creator,
        uint goal,
        uint currentAmount,
        bool goalCompleted,
        bool investorRewarded
    );

    // function for buying the CB Tokens
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

    // function to sell CB Tokens
    function sellcbTokens(uint _amount) public {
        // 1 ether = 20 CB Token
        // checking if there is enough balance to sell
        require(_amount <= cbToken.balanceOf(msg.sender));
        
        // calculating ether amount from token
        uint etherAmount = _amount / rate;

        // checking that Fund Swap has enough balance
        require(address(this).balance >= etherAmount);

        // transfer of CB token to the Fund Swap contract from the investor
        cbToken.transferFrom(msg.sender,address(this),_amount);
        // transfer the amount in Wei form of ether
        payable(msg.sender).transfer(etherAmount);

        emit TokenSold(address(this),address(cbToken),msg.sender,_amount,rate,etherAmount);

    }

    // function for creating project
    function createProject(uint _goal) public{
        totalProject++;
        projects[totalProject] = Project(msg.sender,_goal,0,false,false);
        emit ProjectCreate(msg.sender,_goal,0,false,false);
    }



}
