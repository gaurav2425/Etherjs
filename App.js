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

  // main();

  const getBalance = () => {
    const network = 'sepolia';
    const provider = ethers.getDefaultProvider(network);
    const address = '0x70c68D321Beb263F7e87E68275C210F5EF561BC3';
    provider.getBalance(address).then(balance => {
      // convert a currency unit from wei to ether
      const balanceInEth = ethers.utils.formatEther(balance);
      console.log(`balance: ${balanceInEth} ETH`);
    });
  };

  getBalance();

  // const getTransactionHistory = async => {
  //   let pendingTx =  connect.provider.getTransaction(txHash);
  // };

  // getTransactionHistory();

  return (
    <View>
      <Text>App</Text>
      <Button title="Send Transcation" onPress={main}></Button>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
