pragma solidity >0.5.0;

import "./CbToken.sol";

contract FundSwap{
    string public name = "Fund Swap";
    uint public rate = 20;
    CbToken public cbToken;
    uint public totalProject = 0;
    uint public rewardAmount = 30000000000000000000;


    struct Project{
        address creator;
        uint goal;
        uint currentAmount;
        bool goalCompleted;
        bool investorRewarded;   
    }
    // mapping for storing all the projects created for donation
    mapping( uint =>Project) public projects;

    // mapping for storing addresses of who donated to whom 
    mapping(address =>address[]) public addressInvestor;

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

    // function for rewarding the investor
    function reward(Project memory _proj,address _creator) public returns(Project memory _project){
        uint balance = addressInvestor[_creator].length * rewardAmount;
        if(balance <=cbToken.balanceOf(msg.sender)){
            // require(balance <=cbToken.balanceOf(msg.sender),"Not enough token to reward from CbSwap");
            for(uint i=0; i< addressInvestor[_creator].length ; i++){
                cbToken.transfer(addressInvestor[_creator][i],rewardAmount);
            }
            // investor rewarded
            _proj.investorRewarded = !_proj.investorRewarded;
            _project = _proj;
            return _project;
        }else{
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
    }



}
