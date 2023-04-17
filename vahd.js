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
const regex = /^0x1.*3$/ // 表达式
console.log('Regex:', regex);

for (let i = 0; i < 99999999999; i++) {
    let hdNodeNew = hdNode.derivePath(basePath + "/" + i);
    let walletNew = new ethers.Wallet(hdNodeNew.privateKey);

    if (regex.test(walletNew.address)) {
    //    console.log(`Address： ${walletNew.address}`);
    //    console.log(`Private key： ${walletNew.privateKey}`);
        console.log(`Address: ${walletNew.address} | Private key: ${walletNew.privateKey}`);
        break;
    }
    wallets.push(walletNew); // 不断生成
}

console.log("99999999999? One more time ...")
//console.log(wallets);