pragma solidity ^0.4.25;
import "./ownable.sol";
/***
 * Insurance contracts
 * 
 ***/
 
contract Insurance is Ownable {
    function() public  payable{}
    
    function getConBalance() public view onlyOwner returns(uint) {
        return address(this).balance;
    }
    
    function destroyContract() external onlyOwner {
        selfdestruct(msg.sender);
    }
} 