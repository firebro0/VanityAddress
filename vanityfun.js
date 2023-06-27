import { ethers } from "ethers";
import fs from 'fs';
import path from 'path';
import cluster from 'cluster';
import os from 'os';
import bip39 from 'bip39';

const patterns = [
  /^0x123.*$/,
  /^0x123456789.*$/,
  /^0x1234.*5678$/,
  /^0x12345.*67890$/,
  /^0x1111.*1111$/,
  /^0x2222.*2222$/,
  /^0x3333.*3333$/,
  /^0x4444.*4444$/,
];

//let HDwallet;
let foundAddresses = 0;
const desiredFoundAddresses = 10;
const walletDir = '/Users/kevin/Documents/Wallets';
const logFile = path.join(walletDir, 'vanity.txt');

if (cluster.isMaster) {
  console.log(patterns);
  console.log("Searching...");

  // Create a worker for each CPU
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  // Listen for messages from worker
  cluster.on('message', (worker, message) => {
    console.log(message);
    //fs.appendFileSync(logFile, message + '\n');
  });
} else {
  while (foundAddresses < desiredFoundAddresses) {
  //  const mnemonic = bip39.generateMnemonic(256);
  //  const HDwallet = ethers.HDNodeWallet.fromPhrase(mnemonic);

    const entropy = ethers.randomBytes(32);
    const mnemonic = ethers.Mnemonic.fromEntropy(entropy);
    const HDwallet = ethers.HDNodeWallet.fromMnemonic(mnemonic);

    for (const regex of patterns) {
      if (regex.test(HDwallet.address)) {
        foundAddresses++;

        console.log(
          `${HDwallet.address} | ${HDwallet.privateKey} | ${HDwallet.mnemonic.phrase}`
        );
        
        const pwd = `${HDwallet.address.slice(0, 6)}`;
        const jsonWallet = await HDwallet.encrypt(pwd);
        
        const filename = `${HDwallet.address}.json`;
        const fullPath = path.join(walletDir, filename);
        fs.writeFileSync(fullPath, jsonWallet);
        
        // Send message back to master
        //process.send(`${HDwallet.address} generated.`);
        fs.appendFileSync(logFile, `${HDwallet.address} | ${HDwallet.privateKey} | ${HDwallet.mnemonic.phrase}\n`);
        break;
      }
    }
  }

  // Denote that the worker has finished its job
  process.exit();
}
