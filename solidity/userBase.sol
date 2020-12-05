pragma solidity ^0.4.25;
import "./ownable.sol";
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

}
/**
 * 
 * UserBase
 * 
 * 
**/
contract UserBase is Ownable {
    using SafeMath for uint;
    uint lastGlobalTime;
    uint public contractBlance;  //Balance of contract
    mapping(uint => address[])teamGlobalList;//team global list
    //To a user
    struct Player{
        uint playerRank; //Players level
        uint playerBlance; //The total amount of money a player can earn
        uint totalBlance;//Player's totalBlance
        uint playerWalletAmount; //The amount that can be withdrawn
        uint playerStaticMoney;
        uint playerTeamMoney;
        uint playerGlobalMoney;
        address playerLeaders; //My leader
        bool playerIsJoin; //Players are not allowed to invest
    }    
    mapping(address => Player) players;
    mapping(address => uint)lastStaticTime;
    
    //team 
    struct Team {
        uint userTeamLevel; //Team level
        uint userTeamTotalAmount;//Total Team Performance
        uint userTeamGlobalLevel;//Team global level
        mapping(uint => address[]) teamCop; 
    }
    mapping(address => Team) team;
    
    constructor() public{
        players[topAccount] = Player(3,3000000 ether, 3000000 ether, 0, 0,0,0, 0x0000000000000000000000000000000000000000, true);
        withdrawalSwitchStatus = true;
    }
    
    
    //Increase the drawable balance
    function increasePlayerWalletAmount(address _addr, uint _amount , uint _amountType) internal statusIsOpen {
        require(_amount > 0,"increasePlayerWalletAmount error");
        uint playerMakeMoney = players[_addr].playerStaticMoney + players[_addr].playerTeamMoney + players[_addr].playerGlobalMoney;
        uint totalBlance = players[_addr].totalBlance;
        if (_amount.add(playerMakeMoney) > totalBlance) {
            _amount = totalBlance.sub(playerMakeMoney);  /**safemath sub**/
            players[_addr].playerBlance = 0;
            players[_addr].playerIsJoin = false;
        }
        
        if (_amountType == 1) {
            players[_addr].playerStaticMoney += _amount; //static  add
        }else if(_amountType == 2) {
            players[_addr].playerTeamMoney += _amount; //team add
        }else if(_amountType == 3) {
            players[_addr].playerGlobalMoney += _amount; //global add
        }
        players[_addr].playerWalletAmount += _amount;
    }
    
    //Minus the drawable balance
    function losePlayerWalletAmount(address _addr,uint _amount) internal statusIsOpen {
        require(_addr != address(0) && _amount > 0,"losePlayerWalletAmount error");
        players[_addr].playerWalletAmount = players[_addr].playerWalletAmount.sub(_amount);
    }

    //Here is the user add base
    function userAddBase(address _addr, address _leaders , uint _money) internal {
        require(!players[msg.sender].playerIsJoin && _money >= 1 ether && _leaders != _addr,"userAddBase error");
        //The amount of recharge is related to the static level
        if (players[_addr].playerRank == 0) {
            if (_money <= 10 ether) {
                players[_addr] = Player(1, _money * 3, _money * 3, 0, 0,0,0, _leaders, true);
            } else if (_money >= 11 ether && _money <= 30 ether) {
                players[_addr] = Player(2, _money * 4,_money * 4, 0, 0,0,0, _leaders, true);
            } else if (_money >= 31 ether) {
                players[_addr] = Player(3, _money * 5,_money * 5, 0, 0,0,0, _leaders, true);
            }
        } else {
            if (_money <= 10 ether) {
                players[_addr].playerRank = 1;
                players[_addr].playerBlance = _money *3;
                players[_addr].totalBlance += _money *3;
            } else if (_money >= 11 ether && _money <= 30 ether) {
                players[_addr].playerRank = 2;
                players[_addr].playerBlance = _money *4;
                players[_addr].totalBlance += _money *4;
            } else if (_money >= 31 ether) {
                players[_addr].playerRank = 3;
                players[_addr].playerBlance = _money *5;
                players[_addr].totalBlance += _money *5;
            }
            players[_addr].playerIsJoin = true;
        }
        contractBlance += _money * 9/10; 
        players[topAccount].playerWalletAmount += _money * 10/100; //topAccount
        lastStaticTime[_addr] = now;
        userTeamBase(msg.sender ,_money);
        }
    
    //user team judge
    function userTeamBase(address _addr , uint _money) private statusIsOpen {
        address oneLe =  players[_addr].playerLeaders; //Take out the address of the superior
        address twoLe = players[oneLe].playerLeaders;
        address threeLe = players[twoLe].playerLeaders;
        address fourLe = players[threeLe].playerLeaders;
        address fiveLe = players[fourLe].playerLeaders;
        address sixLe = players[fiveLe].playerLeaders;
        uint userAmount = _money;
        //Determine that the superior is not yourself and is less than 6
        if (team[oneLe].userTeamLevel < 6 && players[_addr].playerLeaders != topAccount) { //topAccount
            team[oneLe].userTeamLevel++; //team level +
        }
        
        if (team[sixLe].userTeamLevel == 6 && players[sixLe].playerIsJoin) {
           team[sixLe].teamCop[6].push(_addr);
           team[sixLe].userTeamTotalAmount += userAmount;
           increasePlayerWalletAmount(sixLe, userAmount * 3/100,2); 
        }
        
        if (team[fiveLe].userTeamLevel >= 5 && players[fiveLe].playerIsJoin) {
           team[fiveLe].teamCop[5].push(_addr);
           team[fiveLe].userTeamTotalAmount += userAmount;
           increasePlayerWalletAmount(fiveLe, userAmount * 3/100,2); 
        }
        
        if (team[fourLe].userTeamLevel >= 4 && players[fourLe].playerIsJoin) {
           team[fourLe].teamCop[4].push(_addr);
           team[fourLe].userTeamTotalAmount += userAmount;
           increasePlayerWalletAmount(fourLe, userAmount * 3/100,2); 
        }
        
        if (team[threeLe].userTeamLevel >= 3 && players[threeLe].playerIsJoin) {
           team[threeLe].teamCop[3].push(_addr);
           team[threeLe].userTeamTotalAmount += userAmount;
           increasePlayerWalletAmount(threeLe, userAmount * 3/100,2); 
        }
        
        if (team[twoLe].userTeamLevel >= 2 && players[twoLe].playerIsJoin) {
           team[twoLe].teamCop[2].push(_addr);
           team[twoLe].userTeamTotalAmount += userAmount;
           increasePlayerWalletAmount(twoLe, userAmount * 3/100,2); 
        }
        
        if (team[oneLe].userTeamLevel >= 1 && players[oneLe].playerIsJoin) {
            team[oneLe].teamCop[1].push(_addr);
            team[oneLe].userTeamTotalAmount += userAmount;
            increasePlayerWalletAmount(oneLe, userAmount * 1/10,2); 
        }
        checkTeamAmount(oneLe);
        checkTeamAmount(twoLe);
        checkTeamAmount(threeLe);
    }
    
    //The global dividend（Management award）
    //Check the team's quota
    function checkTeamAmount(address _addr) public {
        uint total = team[_addr].userTeamTotalAmount; //Take out the total team performance
        for(uint i=0;i < team[_addr].teamCop[1].length;i++) {
            if(team[_addr].userTeamGlobalLevel == 0 && team[team[_addr].teamCop[1][i]].userTeamTotalAmount > 200 ether && total > 400 ether) {
                team[_addr].userTeamGlobalLevel = 1; //Writes the user's global team level
                teamGlobalList[0].push(_addr);//Writes to the user's global team list
            }
            if(team[_addr].userTeamGlobalLevel == 1 && team[team[_addr].teamCop[1][i]].userTeamTotalAmount > 300 ether && total > 1100 ether) {
                team[_addr].userTeamGlobalLevel = 2;
                teamGlobalList[1].push(_addr);
            }
            if(team[_addr].userTeamGlobalLevel == 2 && team[team[_addr].teamCop[1][i]].userTeamTotalAmount > 800 ether && total > 2300 ether) {
                team[_addr].userTeamGlobalLevel = 3;
                teamGlobalList[2].push(_addr);
            }
            if(team[_addr].userTeamGlobalLevel == 3 && team[team[_addr].teamCop[1][i]].userTeamTotalAmount > 2000 ether && total > 7000 ether) {
                team[_addr].userTeamGlobalLevel = 4;
                teamGlobalList[3].push(_addr);
            }
        }
    }
    
    //team global lv Share out bonus
    function globalTeamBase(address _addr,uint lv) internal statusIsOpen {
        uint globalAmount =  contractBlance * 4/100;
        uint globalNum = teamGlobalList[lv].length;
        if(team[_addr].userTeamGlobalLevel != 0 ) {
            increasePlayerWalletAmount(_addr,globalAmount / globalNum,3);
        }
    }

    //Withdrawal method (minus wallet)
    function withdrawal() public payable statusIsOpen WithdrawalSwitch {
        //If the wallet balance is greater than 0.01 && The user's total balance is greater than the money earned
        require(players[msg.sender].playerWalletAmount > 0.01 ether,"withdrawal error");
        if (msg.sender == topAccount) {
            uint _outMoenys = players[msg.sender].playerWalletAmount;
            losePlayerWalletAmount(msg.sender,players[msg.sender].playerWalletAmount * 50/100); //Subtract purse balance
            msg.sender.transfer(_outMoenys * 50/100); 
        } else {
            uint _outMoeny = players[msg.sender].playerWalletAmount;
            losePlayerWalletAmount(msg.sender,players[msg.sender].playerWalletAmount); //Subtract purse balance
            msg.sender.transfer(_outMoeny);  
        }
    }
}