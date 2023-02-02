
const hre = require("hardhat");
const { BigNumber } = require("@ethersproject/bignumber");

async function main() {

  const owner =  await ethers.getSigner(0);
  const _value = ethers.utils.parseEther(".0001");
  const SmartContractAttacker2 = await hre.ethers.getContractFactory("SmartContractAttacker2", owner);
  const smartcontractattacker2 = await SmartContractAttacker2.deploy({ value: _value});

  await smartcontractattacker2.deployed();

  console.log("Deploying contracts with the account:", owner.address);
  const etherBalanceNumber = await owner.getBalance();
  const etherBalanceWei = ethers.utils.formatUnits(etherBalanceNumber, "wei");
  const etherBalanceEth = ethers.utils.formatEther(etherBalanceWei);

  console.log('Account Balance in Wei: ', etherBalanceWei);
  console.log('Account Balance in Ether: ', etherBalanceEth);

  console.log(
    `SmartContractAttacker deployed to ${smartcontractattacker2.address}`
  );

  await smartcontractattacker2.ownerWithdraw();

  const tx = {
    to: smartcontractattacker2.address,
    value: ethers.utils.parseEther("0.0003"),
  };
  await owner.sendTransaction(tx);

  const amountWei = ethers.utils.parseEther("0.0002");
  await smartcontractattacker2.deposit2(amountWei, {value: amountWei });

  await smartcontractattacker2.deposit({ value: ethers.utils.parseEther("0.00022")});

  //Here we use ethers.provider.getBalance to get balance
  const contractBalance = await ethers.provider.getBalance(smartcontractattacker2.address);
  console.log('Balance is: ' + contractBalance);

  //Here we call a function on the smart contract to get balance
  const balance = await smartcontractattacker2.getContractBalance();
  console.log(`Balance is: ${balance}`);
 
  await smartcontractattacker2.hackWinner();
  console.log('Hacked Winner');

}
  
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
