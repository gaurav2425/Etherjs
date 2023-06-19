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
import {showMessage, hideMessage} from 'react-native-flash-message';

const ethers = require('ethers');

const App = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState('');

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

  async function main() {
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
    getBalance();
    // 3719460
  }

  // main();

  useEffect(() => {
    getBalance();
  }, []);

  // const getTransactionHistory = async => {
  //   let pendingTx =  connect.provider.getTransaction(txHash);
  // };

  // getTransactionHistory();

  return (
    <View style={styles.logincontainer}>
      <View style={styles.fieldscontainer}>
        <View style={styles.login_txt_container}>
          <Text style={styles.balance_txt}>Current Balance{balance}</Text>
          <Text style={styles.login_txt}>Transfer Eth</Text>
        </View>

        <TextInput
          placeholder="0xAf37F5799D111c12149871b312Ca26A52a23a0D5"
          style={styles.address}
          value={address}
          placeholderTextColor={'#9B9898'}
          onChangeText={text => setAddress(text)}></TextInput>

        <TextInput
          placeholder="0.1 ether 10^17"
          style={styles.amount}
          placeholderTextColor={'#9B9898'}
          value={amount}
          onChangeText={text => setAmount(text)}></TextInput>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            main();
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
    // textAlign: 'center',
    marginLeft: 10,
  },
  txtcontainer: {
    width: P90,
    // backgroundColor: '#FFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txtlogo: {
    color: '#000000',
    fontSize: 30,
    fontFamily: 'Poppins-BlackItalic',
    textAlign: 'center',
    // paddingTop: 30,
  },
  login_txt_container: {
    width: P90,
    // backgroundColor: '#F65F69',
  },

  address: {
    backgroundColor: '#1A1919',
    width: P90,
    alignSelf: 'center',
    marginTop: 10,
    // borderRadius: 10,
    paddingLeft: 10,
    fontSize: 17,
    fontFamily: 'Gilroy-Medium',
    // borderWidth: 1,
    color: '#FFFFFF',
    // borderColor: '#7D7878',
    // borderColor: '#D9D3D3',
  },

  amount: {
    backgroundColor: '#1A1919',
    width: P90,
    alignSelf: 'center',
    marginTop: 10,
    // borderRadius: 10,
    fontSize: 17,
    fontFamily: 'Gilroy-Medium',
    paddingLeft: 10,
    // borderWidth: 1,
    color: '#FFFFFF',
    // borderColor: '#7D7878',
    // borderColor: '#D9D3D3',
  },
  fieldscontainer: {
    paddingTop: P20,
    // backgroundColor: '#696969',
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
    // backgroundColor: '#0FA60C',
    alignSelf: 'center',
    // borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btntxt: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 21,
    fontFamily: 'Gilroy-Bold',
    // letterSpacing: 1,
  },
  txt2: {
    color: '#FFFFFF',
    // width: P90,

    paddingTop: 10,
    marginLeft: 10,
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
    // backgroundColor: '#FFFF',
  },
  txt2Register: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
    // backgroundColor: '#FFFF',
    paddingTop: 10,
    marginLeft: 5,
    color: '#FFFF',
  },
  txt2container: {
    // backgroundColor: '#F65F65',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 20,
  },
});
