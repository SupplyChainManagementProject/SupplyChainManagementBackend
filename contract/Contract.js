const { ethers, providers } = require('ethers');
const dotenv = require('dotenv')
dotenv.config()

const provider = new ethers.providers.JsonRpcProvider(String(process.env.SEPOLIA_RPC_URL));
const privateKey = process.env.SEPOLIA_PRIVATE_KEY; 
const contractAbi = require('../contract/MainContractABI.json')

const signer = new ethers.Wallet(privateKey, provider);
const contractAddress = process.env.SEPOLIA_CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

module.exports = contract