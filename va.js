// const regex = /^0x00.*11$/

import { ethers } from "ethers";

var wallet
const regex = /^0x0000.*0000$/
var isValid = false
while(!isValid){
    wallet = ethers.Wallet.createRandom()
    isValid = regex.test(wallet.address)
    console.log(wallet.address)
}

console.log(`Address: ${wallet.address} | Private Key: ${wallet.privateKey}`);
