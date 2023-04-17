// 正则表达式，
// ^0x之后跟前几位要匹配的字符
// .*为通配符
// $之前写最后几位要匹配的字符
// 例子：首位两个0，末尾两个1 
// const regex = /^0x00.*11$/

import { ethers } from "ethers";

var wallet // 钱包
const regex = /^0x1980.*0313$/ // 表达式 ^0x.*19800313.*$
var isValid = false
while(!isValid){
    wallet = ethers.Wallet.createRandom() // 随机生成钱包，安全
    isValid = regex.test(wallet.address) // 检验正则表达式
    console.log(wallet.address)
}
// 打印靓号地址与私钥
//console.log(`\nAddress：${wallet.address}`)
//console.log(`Private Key：${wallet.privateKey}\n`)
console.log(`Address: ${wallet.address} | Private Key: ${wallet.privateKey}`);