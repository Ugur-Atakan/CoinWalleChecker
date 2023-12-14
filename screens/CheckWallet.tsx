import { Alert, Button, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { getBalanceFromBSScan, getBalance, getTokenMetadata } from "../utils/GetBalance";
import { Utils } from "alchemy-sdk";
import BigInt from 'big-integer'

export default function WalletCheckPage() {

  const [tokenAddress, setTokenAddress] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState<any>('');
  const [bscbalance, setBscBalance] = useState<any>('');
  const [metaData, setMetaData] = useState({
    "decimal": '',
    "logo": '',
    "name": '',
    "symbol": '',
  });


  const checkBalance = async () => {
    if (tokenAddress === '' || walletAddress === '') {
      Alert.alert('Lütfen boş alan bırakmayınız.');
      return;
    }

    await getBalanceAlchey();
    await BinanceNetwork();

  }

  const getBalanceAlchey = async () => {
    const metadata = await getTokenMetadata(tokenAddress);
    let data = {
      "decimal": metadata.decimals,
      "logo": metadata.logo,
      "name": metadata.name,
      "symbol": metadata.symbol,
    }
    setMetaData(data as any);
    const balance = await getBalance(tokenAddress, walletAddress);

    let weiValue = BigInt(balance!.substring(2), 16);
    let formatted = Utils.formatEther(weiValue.toString());

    setBalance(formatted);
  }

  const BinanceNetwork = async () => {
    const bsc = await getBalanceFromBSScan(tokenAddress, walletAddress);
    let formattedbsc = Utils.formatEther(bsc);
    setBscBalance(formattedbsc)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        aria-label="Token Address"
        style={{ margin: 10, width: 300, height: 60, borderWidth: 1 }}
        value="0x9332dFc361763d58565139da819c86E773E17249" />

      <TextInput
        aria-label="Wallet Address"
        style={{ margin: 10, width: 300, height: 60, borderWidth: 1 }}
        value="0xacf42a488e6b2d32bd5c32996bbf8ce743a50f49" />
      <Text style={{ fontSize: 24 }}>WalletCheckPage</Text>
      <View>
        <TextInput
          placeholder="Token Address"
          aria-label="Token Address"
          value={tokenAddress}
          style={{ margin: 10, width: 300, height: 60, borderWidth: 1 }}
          onChangeText={(text) => setTokenAddress(text)}
        />
        <TextInput
          placeholder="Wallet Address"
          aria-label="Wallet Address"
          value={walletAddress}
          style={{ margin: 10, width: 300, height: 60, borderWidth: 1 }}
          onChangeText={(text) => setWalletAddress(text)}
        />

        <Button title="Check" onPress={() => checkBalance()} />
        <View style={{ height: 20 }} />
        <Text style={{ alignSelf: 'center' }}>Sorgu sonuçları</Text>
        <Text>Token Adresi: {tokenAddress}</Text>
        <Text>Wallet Adresi: {walletAddress}</Text>
        <Text>Token Kısa Adı: {metaData?.symbol}</Text>
        <Text>Token Adı: {JSON.stringify(metaData.name)}</Text>
        <Text> ETH Token Bakiyesi: {'\n'}{balance}</Text>
        <Text>BNC Ağındaki bakiyesi: {bscbalance}</Text>

      </View>
    </View>
  );
}