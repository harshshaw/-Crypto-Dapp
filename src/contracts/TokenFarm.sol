pragma solidity >0.5.0;

// import "./DappToken.sol";
// import "./DaiToken.sol";

// contract TokenFarm {
//     string public name = "Dapp Token Farm";
    // address public owner;
//     DappToken public dappToken;
//     DaiToken public daiToken;

//     address[] public stakers;
//     mapping(address => uint) public stakingBalance;
//     mapping(address => bool) public hasStaked;
//     mapping(address => bool) public isStaking;

//     constructor(DappToken _dappToken, DaiToken _daiToken) public {
//         dappToken = _dappToken;
//         daiToken = _daiToken;
//         owner = msg.sender;
//     }

//     function stakeTokens(uint _amount) public {
//         // Require amount greater than 0
//         require(_amount > 0, "amount cannot be 0");

//         // Trasnfer Mock Dai tokens to this contract for staking
//         daiToken.transferFrom(msg.sender, address(this), _amount);

//         // Update staking balance
//         stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

//         // Add user to stakers array *only* if they haven't staked already
//         if(!hasStaked[msg.sender]) {
//             stakers.push(msg.sender);
//         }

//         // Update staking status
//         isStaking[msg.sender] = true;
//         hasStaked[msg.sender] = true;
//     }

    // // Unstaking Tokens (Withdraw)
    // function unstakeTokens() public {
    //     // Fetch staking balance
    //     uint balance = stakingBalance[msg.sender];

    //     // Require amount greater than 0
    //     require(balance > 0, "staking balance cannot be 0");

    //     // Transfer Mock Dai tokens to this contract for staking
    //     daiToken.transfer(msg.sender, balance);

    //     // Reset staking balance
    //     stakingBalance[msg.sender] = 0;

    //     // Update staking status
    //     isStaking[msg.sender] = false;
    // }

    // // Issuing Tokens
    // function issueTokens() public {
    //     // Only owner can call this function
    //     require(msg.sender == owner, "caller must be the owner");

    //     // Issue tokens to all stakers
    //     for (uint i=0; i<stakers.length; i++) {
    //         address recipient = stakers[i];
    //         uint balance = stakingBalance[recipient];
    //         if(balance > 0) {
    //             dappToken.transfer(recipient, balance);
    //         }
    //     }
    // }
// }


import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm{
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;
    address public owner;
    constructor(DappToken _dappToken, DaiToken _daiToken) public{
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    address[] public stackers;
    mapping(address => uint) public stackingBalance;
    mapping(address => bool) public hasStacked;
    mapping(address => bool) public isStacking;

    // Stake tokens
    function stakeTokens(uint _amount) public{

        // require amount should be greater than 0
        require(_amount >0, "amount cannot be 0");

        // transfer mock dai token to this contract for staking
        daiToken.transferFrom(msg.sender,address(this),_amount);

        // update stacking balance
        stackingBalance[msg.sender] = stackingBalance[msg.sender] + _amount;

        // add user to stackers array only if they haven't 
        // stacked already
        if(!hasStacked[msg.sender]){
            stackers.push(msg.sender);
        }

        // update stacking status
        isStacking[msg.sender]= true;
        hasStacked[msg.sender]= true;
        
    }

     // Unstaking Tokens (Withdraw)
    function unstakeTokens() public {
        // Fetch staking balance
        uint balance = stackingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transfer(msg.sender, balance);

        // Reset staking balance
        stackingBalance[msg.sender] = 0;

        // Update staking status
        isStacking[msg.sender] = false;
    } 

    // Issuing Tokens
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint i=0; i<stackers.length; i++) {
            address recipient = stackers[i];
            uint balance = stackingBalance[recipient];
            if(balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }
 
}