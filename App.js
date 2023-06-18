import 'react-native-get-random-values';
// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';
import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';

const ethers = require('ethers');

// {
//   "jsonrpc": "2.0",
//   "id": 1,
//   "result": "0x7a9bd7186bfaba2fa79cd4178225f5451b80bfcfd29b8c96e6a4a18f768225d6"
// }

const App = () => {
  async function main() {
    let privatekey =
      '30c712785c06faab07c19a40070654d47c50645aa25bc5c99f6ce1cc1cbc9a6f';
    let wallet = new ethers.Wallet(privatekey);

    console.log('Using wallet address ' + wallet.address);
    // 0xc4b7b1f8ff7adc17c1b84215a4b7db1b254854cb468cc053bc2ffc62e18b94ae
    // 0x6c5c18cb41bb0ad6ddfc5c4b0dfa22e252e94dfc285051cf3c328e5faac0411f
    let transaction = {
      to: '0x260DD5e6600700bfFF5957A1d71F1befF4323C90',
      value: ethers.utils.parseEther('0.0001'),
      gasLimit: '21000',
      maxPriorityFeePerGas: ethers.utils.parseUnits('20000', 'gwei'),
      maxFeePerGas: ethers.utils.parseUnits('20000', 'gwei'),
      nonce: 70,
      type: 2,
      chainId: 11155111,
    };

    // sign and serialize the transaction
    let rawTransaction = await wallet
      .signTransaction(transaction)
      .then(ethers.utils.serializeTransaction(transaction));

    // print the raw transaction hash
    console.log('Raw txhash string ' + rawTransaction);

    // pass the raw transaction hash to the "eth_sendRawTransaction" endpoint
    let gethProxy = await fetch(
      `https://api-sepolia.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=${rawTransaction}&apikey=Y445JX5UGBMF9Y3RQTGQW9EQ56AM23Z1DB`,
    );
    let response = await gethProxy.json();

    // print the API response
    console.log(response);
  }

  // main();

  // (async () => {
  //   const provider = new ethers.providers.JsonRpcProvider(
  //     'https://docs-demo.quiknode.pro/',
  //   );
  //   const txCount = await provider.getTransactionCount(
  //     '0x8D97689C9818892B700e27F316cc3E41e17fBeb9',
  //     'latest',
  //   );
  //   console.log(txCount);
  // })();

  async function main() {
    // Configuring the connection to an Ethereum node
    const network = 'sepolia';
    const provider = new ethers.providers.InfuraProvider(
      network,
      '8773653715104087b88e88d18fa90df4',
    );
    // Creating a signing account from a private key
    const signer = new ethers.Wallet(
      '30c712785c06faab07c19a40070654d47c50645aa25bc5c99f6ce1cc1cbc9a6f',
      provider,
    );

    // Creating and sending the transaction object
    const tx = await signer.sendTransaction({
      to: '0x260DD5e6600700bfFF5957A1d71F1befF4323C90',
      value: ethers.utils.parseUnits('0.0001', 'ether'),
    });
    console.log('Mining transaction...');
    console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
    // Waiting for the transaction to be mined
    const receipt = await tx.wait();
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);
    console.log(receipt.transactionHash);
    // 3719460
  }

  // require('dotenv').config();
  // main();

  const CheckBalance = async () => {
    // Configure the ITX provider using your Infura credentials
    const itx = new ethers.providers.InfuraProvider(
      'sepolia',
      '8773653715104087b88e88d18fa90df4',
    );

    // Create a signer instance based on your private key
    const signer = new ethers.Wallet(
      '30c712785c06faab07c19a40070654d47c50645aa25bc5c99f6ce1cc1cbc9a6f',
      itx,
    );
    console.log(`Signer public address: ${signer.address}`);

    // Check your existing ITX balance
    // balance is added by sending eth to the deposit address: 0x015C7C7A7D65bbdb117C573007219107BD7486f9
    // balance is deducted everytime you send a relay transaction
    // const {balance} = await itx.send('relay_getBalance', [signer.address]);
    // console.log(`Current ITX balance: ` + ethers.utils.formatEther(balance));
  };

  CheckBalance();

  return (
    <View>
      <Text>App</Text>
      <Button title="Send Transcation" onPress={main}></Button>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
