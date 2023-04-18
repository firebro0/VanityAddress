import { ethers } from "ethers";

const patterns = [
  /^0x111.*222$/,
  /^0.*111222.*$/,
  /^0x111.*222$/,
  /^0x.*test.*$/,
];

let HDwallet;
let foundAddresses = 0;
const desiredFoundAddresses = 10;

console.log(patterns);
console.log("Searching...");

while (foundAddresses < desiredFoundAddresses) {
  HDwallet = ethers.HDNodeWallet.createRandom();

  for (const regex of patterns) {
    if (regex.test(HDwallet.address)) {
      console.log(
        `Address: ${HDwallet.address} | Private Key: ${HDwallet.privateKey} | Mnemonic: ${HDwallet.mnemonic.phrase}`
      );
      foundAddresses++;
      break;
    }
  }
}
