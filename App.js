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

  async function getTransactionHistory1() {
    // Connect to an Ethereum provider
    const provider = new ethers.providers.JsonRpcProvider(
      'https://sepolia.infura.io/v3/8773653715104087b88e88d18fa90df4',
    );

    const address = '0x70c68D321Beb263F7e87E68275C210F5EF561BC3';

    // Get transaction history for the address
    // const history = await provider.getHistory(address);
    console.log(provider);

    // Process and display transaction details
    // history.forEach(tx => {
    //   console.log('Transaction Hash:', tx.hash);
    //   console.log('From:', tx.from);
    //   console.log('To:', tx.to);
    //   console.log('Value:', ethers.utils.formatEther(tx.value));
    //   console.log('Block Number:', tx.blockNumber);
    //   console.log('Timestamp:', new Date(tx.timestamp * 1000).toUTCString());
    //   console.log('-----------------------------');
    // });
  }

  // Provide the Ethereum address for which you want to retrieve the transaction history
  // getTransactionHistory();

  const getTransactionHistory = async privateKey => {
    try {
      // Connect to the Ethereum network using the provider
      const provider = new ethers.InfuraProvider(
        'sepolia', // or 'mainnet' for the main Ethereum network
        '8773653715104087b88e88d18fa90df4',
      );

      // Create a wallet using the private key
      const wallet = new ethers.Wallet(privateKey, provider);

      // Get the transaction history
      const history = await provider.getHistory(wallet.address);

      // Process and display the transaction history
      history.forEach(transaction => {
        console.log('Transaction Hash:', transaction.hash);
        console.log('From:', transaction.from);
        console.log('To:', transaction.to);
        console.log('Value:', ethers.utils.formatEther(transaction.value));
        console.log('Block Number:', transaction.blockNumber);
        console.log('-------------------');
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // getTransactionHistory(
  //   '30c712785c06faab07c19a40070654d47c50645aa25bc5c99f6ce1cc1cbc9a6f',
  // );

  return (
    <View>
      <Text>App</Text>
      <Button title="Send Transcation" onPress={main}></Button>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
