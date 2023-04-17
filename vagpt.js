import { ethers } from "ethers";

const targetString = '111222';

let wallet = ethers.Wallet.createRandom();
let walletAddress = wallet.address;
while (!walletAddress.includes(targetString)) {
  wallet = ethers.Wallet.createRandom();
  walletAddress = wallet.address;
}

//console.log(`Address: ${walletAddress}`);
//console.log(`Private Key: ${wallet.privateKey}`);
console.log(`Address: ${walletAddress} | Private Key: ${wallet.privateKey}`);
