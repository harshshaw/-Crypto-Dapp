pragma solidity >0.5.0;
pragma experimental ABIEncoderV2;

import "./CbToken.sol";

contract FundSwap{
    string public name = "Fund Swap";
    uint public rate = 20;
    CbToken public cbToken;
    uint public totalProject = 0;


    struct Project{
        string projectName;
        address creator;
        string description;
        string projectLink;
        uint goal;
        uint currentAmount;
        bool goalCompleted;
        bool investorRewarded;   
    }

    // mapping for storing all the projects created for donation
    mapping( uint =>Project) public projects;

    // mapping for storing addresses of who donated to whom 
    mapping(address =>address[]) public addressInvestor;

    // rewarded total amount of cb token for the investor 
    mapping( address => uint) public totalReward;

    // to get the number of amount in cb token for the 
    // reward received on a project goal completion
    mapping(address => mapping(address => uint)) public addressReward;

    // to get the number of amount in cb token for the 
    // rewared donated on a project
    mapping(address => mapping(address => uint)) public amountDonated;

    // to keep track of the addresses received reward or not
    mapping(address => mapping(address => bool)) public rewardReceived;


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

    // event for donation
    event Donation(
        address creator,
        uint id,
        uint amount
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
        msg.sender.transfer(etherAmount);

        emit TokenSold(address(this),address(cbToken),msg.sender,_amount,rate,etherAmount);

    }

    // function for creating project
    function createProject(string memory _name,string memory _description,string memory _link,uint _goal) public{
        totalProject++;
        projects[totalProject] = Project(_name,msg.sender,_description,_link,_goal,0,false,false);
        emit ProjectCreate(msg.sender,_goal,0,false,false);
    }

    // function for rewarding the investor
    function reward(Project memory _proj,address _creator) public returns(Project memory _project){
        // suppose current amount 40
        // so balance will be 1.6
        uint balance = _proj.currentAmount * 4/100;
        if(balance <= cbToken.balanceOf(msg.sender)){
            // require(balance <=cbToken.balanceOf(msg.sender),"Not enough token to reward from CbSwap");
            for(uint i=0; i< addressInvestor[_creator].length ; i++){
                if(!rewardReceived[_creator][addressInvestor[_creator][i]]){
                    cbToken.transfer(addressInvestor[_creator][i],amountDonated[_creator][addressInvestor[_creator][i]]*4/100);
                    addressReward[_creator][addressInvestor[_creator][i]] += amountDonated[_creator][addressInvestor[_creator][i]]*4/100;
                    rewardReceived[_creator][addressInvestor[_creator][i]] = true;
                    totalReward[addressInvestor[_creator][i]] += amountDonated[_creator][addressInvestor[_creator][i]]*4/100;
                }
            }
            // investor rewarded
            _proj.investorRewarded = !_proj.investorRewarded;
            _project = _proj;
            return _project;
        }else{
            // noice[1][2] = 15;
            _project = _proj;
            return _project;        
        }
        
    }

    // function to contribute CB tokens to the opensource projects
    function donate(uint _id, address _to,uint _amount) public{
        // 
        require(_amount<= cbToken.balanceOf(msg.sender));
        Project memory _proj = projects[_id];
        if(_proj.creator == _to){
            cbToken.transferFrom(msg.sender, _to, _amount);
            amountDonated[_proj.creator][msg.sender] +=  _amount;
            if(!rewardReceived[_proj.creator][msg.sender])
                rewardReceived[_proj.creator][msg.sender] = false;
            addressInvestor[_proj.creator].push(msg.sender);
            _proj.currentAmount += _amount;
            if(_proj.currentAmount >= _proj.goal && !_proj.goalCompleted){
                // goal completed true
                _proj.goalCompleted = !_proj.goalCompleted;
                // call the reward function with _proj and address of creator as parameter
                _proj = reward(_proj,_to);
                // investor rewarded
                // _proj.investorRewarded = !_proj.investorRewarded;
            }
        }
        // set the updated project state
        projects[_id] = _proj;
        emit Donation(_to, _id, _amount);
    }



}
