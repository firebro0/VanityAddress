import { ethers } from "ethers";

var HDwallet
const regex = /^0x1980.*0313$/ // 表达式
console.log('Regex:', regex);
var isValid = false
while(!isValid){
    HDwallet = ethers.HDNodeWallet.createRandom() // 随机生成钱包，安全
    isValid = regex.test(HDwallet.address) // 检验正则表达式
    //console.log(HDwallet.address)
}

// 打印
//console.log(HDwallet)
console.log(`Address: ${HDwallet.address} | Private Key: ${HDwallet.privateKey} | Memo：${HDwallet.mnemonic.phrase}`);