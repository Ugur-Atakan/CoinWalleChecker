import { Alchemy, Network } from 'alchemy-sdk';
import axios from 'axios';

const settings = {
  apiKey: "3p1YG8rG0A7PypLzSXiVPpsKZLu8Z6YZ",
  network: Network.BASE_MAINNET,
};
const alchemy = new Alchemy(settings);


export const getBalance = async (tokenAdress: string, walletAddress: string) => {

  const tokenAdresses = [];
  tokenAdresses.push(tokenAdress);

  const balance = await alchemy.core.getTokenBalances(walletAddress, tokenAdresses);

  return balance.tokenBalances[0].tokenBalance;
}


export const getTokenMetadata = async (tokenAdress: string) => {
  const metadata = await alchemy.core.getTokenMetadata(
    tokenAdress
  )
  return metadata
}
export const getBalanceFromBSScan = async (tokenAddress: string, walletAddress: string) => {
  const url = `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${walletAddress}&tag=latest&apikey=GA1NMNX19QEMPPJTKSBFYATUGMR72BG54G`;
  const response = await axios.get(url);
  return response.data.result;
}


export const getBalanceFromEtherScan = async (tokenAddress: string, walletAddress: string) => {
  const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${walletAddress}&tag=latest&apikey=9EUY4AZMVD77NUPH5K1EH6ZYS3859FM25R`;
  const response = await axios.get(url);
  return response.data.result;
}


