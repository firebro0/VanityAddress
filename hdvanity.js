import { ethers } from "ethers";

var HDwallet
const regex = /^0x111.*333$/
console.log('Regex:', regex);
var isValid = false
while(!isValid){
    HDwallet = ethers.HDNodeWallet.createRandom()
    isValid = regex.test(HDwallet.address)
    //console.log(HDwallet.address)
}

//console.log(HDwallet)
console.log(`Address: ${HDwallet.address} | Private Key: ${HDwallet.privateKey} | Memo：${HDwallet.mnemonic.phrase}`);
