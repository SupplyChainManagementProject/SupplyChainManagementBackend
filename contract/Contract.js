const { ethers, providers } = require('ethers');
const dotenv = require('dotenv')
dotenv.config()

const provider = new ethers.providers.JsonRpcProvider(String(process.env.RPC_ENDPOINT));
const privateKey = process.env.PRIVATE_KEY; 
const contractAbi = require('../contract/MainContractABI.json')

const signer = new ethers.Wallet(privateKey, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

module.exports = contract