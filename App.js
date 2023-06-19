import 'react-native-get-random-values';
// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';

const ethers = require('ethers');

const App = () => {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('');
  const [receiversAddress, setReceiversAddress] = useState('');

  const getBalance = () => {
    const network = 'sepolia';
    const provider = ethers.getDefaultProvider(network);
    const address = '0x70c68D321Beb263F7e87E68275C210F5EF561BC3';
    provider.getBalance(address).then(balance => {
      // convert a currency unit from wei to ether
      const balanceInEth = ethers.utils.formatEther(balance);
      console.log(`balance: ${balanceInEth} ETH`);
      setBalance(balanceInEth);
    });
  };

  const checkStatus = txhash => {
    const url = 'https://sepolia.infura.io/v3/8773653715104087b88e88d18fa90df4';
    const data = {
      jsonrpc: '2.0',
      method: 'eth_getTransactionReceipt',
      params: [`${txhash}`],
      id: 1,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result != null) {
          showMessage({
            message: `Successful Transcation with Hash: ${txhash}`,
            type: 'success',
            duration: 10000,
          });
        } else {
          showMessage({
            message: `Transcation is Processing`,
            type: 'info',
            duration: 10000,
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  async function SendEth() {
    showMessage({
      message: `Transaction is Started...`,
      type: 'info',
      autoHide: false,
    });

    const ProjectID = '8773653715104087b88e88d18fa90df4';
    const PrivateKey =
      '30c712785c06faab07c19a40070654d47c50645aa25bc5c99f6ce1cc1cbc9a6f';
    // const ReceiversAddress = '0x260DD5e6600700bfFF5957A1d71F1befF4323C90';
    const network = 'sepolia';
    const provider = new ethers.providers.InfuraProvider(network, ProjectID);
    // Creating a signing account from a private key
    const signer = new ethers.Wallet(PrivateKey, provider);

    // Creating and sending the transaction object
    const tx = await signer.sendTransaction({
      to: receiversAddress,
      value: ethers.utils.parseUnits('0.0001', 'ether'),
    });
    showMessage({
      message: `Mining transaction...`,
      type: 'info',
      autoHide: false,
    });
    console.log('Mining transaction...');
    console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
    // Waiting for the transaction to be mined
    const receipt = await tx.wait();
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);
    console.log(receipt.transactionHash);
    console.log(`Block Hash:`, receipt.blockHash);
    setReceiversAddress('');
    checkStatus(receipt.transactionHash);
    getBalance();
  }

  const checkValidity = () => {
    if (
      receiversAddress != '' &&
      ethers.utils.isAddress(receiversAddress) == true
    ) {
      SendEth();
    } else {
      showMessage({
        message: `Enter Valid Address`,
        type: 'info',
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <View style={styles.logincontainer}>
      <View style={styles.fieldscontainer}>
        <View style={styles.login_txt_container}>
          <Text style={styles.balance_txt}>Current Balance: {balance}</Text>
          <Text style={styles.login_txt}>Transfer Eth</Text>
        </View>

        <TextInput
          placeholder="0xAf37F5799D111c12149871b312Ca26A52a23a0D5"
          style={styles.address}
          value={receiversAddress}
          placeholderTextColor={'#9B9898'}
          onChangeText={text => setReceiversAddress(text)}></TextInput>

        <TextInput
          placeholder="0.1 ether 10^17"
          style={styles.amount}
          placeholderTextColor={'#9B9898'}
          value={amount}
          onChangeText={text => setAmount(text)}></TextInput>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            checkValidity();
          }}>
          <Text style={styles.btntxt}>Transfer ETH</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.txt2container}>
        <Text style={styles.txt2}>
          Designed and Developed By Gaurav Burande
        </Text>
      </View>
      <StatusBar backgroundColor="#1A1919" barStyle="light-content" />
      <FlashMessage position="top" />
    </View>
  );
};

export default App;

const P90 = '90%';
const P20 = '20%';

const styles = StyleSheet.create({
  logincontainer: {
    flex: 1,
    backgroundColor: '#0C0C0C',
    justifyContent: 'space-between',
  },
  balance_txt: {
    fontSize: 25,
    color: '#FFFFFF',
  },
  login_txt: {
    fontSize: 45,
    fontFamily: 'Gilroy-Bold',
    color: '#FFFFFF',
  },

  txt: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Poppins-BlackItalic',
    marginLeft: 10,
  },
  txtcontainer: {
    width: P90,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txtlogo: {
    color: '#000000',
    fontSize: 30,
    fontFamily: 'Poppins-BlackItalic',
    textAlign: 'center',
  },
  login_txt_container: {
    width: P90,
  },

  address: {
    backgroundColor: '#1A1919',
    width: P90,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 17,
    fontFamily: 'Gilroy-Medium',
    color: '#FFFFFF',
  },

  amount: {
    backgroundColor: '#1A1919',
    width: P90,
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 17,
    fontFamily: 'Gilroy-Medium',
    paddingLeft: 10,
    color: '#FFFFFF',
  },
  fieldscontainer: {
    paddingTop: P20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btncontainer: {
    width: P90,
    alignSelf: 'center',
    paddingTop: 10,
  },
  btn: {
    height: 50,
    width: P90,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btntxt: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 21,
    fontFamily: 'Gilroy-Bold',
  },
  txt2: {
    color: '#FFFFFF',

    paddingTop: 10,
    marginLeft: 10,
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
  },
  txt2Register: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
    paddingTop: 10,
    marginLeft: 5,
    color: '#FFFF',
  },
  txt2container: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 20,
  },
});
