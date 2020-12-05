pragma solidity ^0.4.25;

/**
* @title Ownable
* @dev The Ownable contract has an owner address, and provides basic authorization control
* functions, this simplifies the implementation of "user permissions".
*/
contract Ownable {
    address private _owner;
    address private _cto;
    address constant topAccount = 0x80Ce888C76a85364fc375d0C082D6877F89cc0a2; //topuser address
    bool status;
    bool public withdrawalSwitchStatus;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

  /**
  * @dev The Ownable constructor sets the original `owner` of the contract to the sender
  * account.
  */
    constructor() public {
        _owner = msg.sender;
        _cto = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

  /**
  * @return the address of the owner.
  */
    function owner() public view returns(address,address) {
        return (
            _owner,
            _cto
        );
    }

  /**
  * @dev Throws if called by any account other than the owner.
  */
    modifier onlyOwner() {
        require(isOwner(),"not is ow");
        _;
    }
  //When the contract closes
    modifier statusIsClose() {
        require(status);
        _;
    }
    //Contract opening
    modifier statusIsOpen() {
        require(!status);
        _;
    }
    
    //tingzhitixian
    modifier WithdrawalSwitch() {
        require(withdrawalSwitchStatus," WithdrawalSwitch is off");
        _;
    }
    
    /**
  * @return true if `msg.sender` is the owner of the contract.
  */
    function isOwner() public view returns(bool) {
        return msg.sender == _owner || msg.sender == _cto;
    }

  /**
  * @dev Allows the current owner to relinquish control of the contract.
  * @notice Renouncing to ownership will leave the contract without an owner.
  * It will not be possible to call the functions with the `onlyOwner`
  * modifier anymore.
  */
    // function renounceOwnership() public onlyOwner {
    //     emit OwnershipTransferred(_owner, address(0));
    //     _owner = address(0);
    // }

  /**
  * @dev Allows the current owner to transfer control of the contract to a newOwner.
  * @param newOwner The address to transfer ownership to.
  */
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }
    
    function transferCto(address newCto) public onlyOwner {
        _transferCtoship(newCto);
    }

  /**
  * @dev Transfers control of the contract to a newOwner.
  * @param newOwner The address to transfer ownership to.
  */
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0));
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
    
    function _transferCtoship(address newCto) internal {
        require(newCto != address(0));
        _cto = newCto;
    }
    
     //close
    function closeStatus() public onlyOwner statusIsOpen {
        status = true;
    }
    
    //open
    function openStatus() public onlyOwner statusIsClose {
        status = false;
    }
    
    function _WithdrawalSwitch(bool _status) public onlyOwner returns(bool) {
        withdrawalSwitchStatus = _status;
        return withdrawalSwitchStatus;
    }
    
}