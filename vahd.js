import { ethers } from "ethers";

// 1. 创建HD钱包
// 生成随机助记词
const mnemonic = ethers.Wallet.createRandom().mnemonic;
//console.log(mnemonic);
// 创建HD钱包
const hdNode = ethers.HDNodeWallet.fromMnemonic(mnemonic);
//console.log(hdNode);
console.log(`Address: ${hdNode.address} | Private Key: ${hdNode.privateKey} | Memo：${hdNode.mnemonic.phrase}`);

// 2. 通过HD钱包派生钱包
// 派生路径：m / purpose' / coin_type' / account' / change / address_index
// 切换最后一位address_index，就可以从hdNode派生出新钱包

let basePath = "m/44'/60'/0'/0";
let wallets = [];
const regex = /^0x111.*333$/
console.log('Regex:', regex);

var isValid = false
while(!isValid){
    let hdNodeNew = hdNode.derivePath(basePath + "/" + i);
    let walletNew = new ethers.Wallet(hdNodeNew.privateKey);

    isValid = regex.test(walletNew.address)
    //console.log(walletNew.address)
}

console.log(`Address: ${walletNew.address} | Private key: ${walletNew.privateKey}`);
