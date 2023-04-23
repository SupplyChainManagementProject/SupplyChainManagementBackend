const swaggerJsDoc = require('swagger-jsdoc')

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Supply Chain Management API",
			version: "1.0.0",
			description: `To solve the prevalent problems in Supply Chain Management - Product Traceability, Dispute Resolution, Decentralized Authority, Costs of Middlemen and Trustless Transactions, the project extensibly uses Solidity Smart Contracts Technology of Ethereum Blockchain.\n\n
            For any transaction that takes place on the Ethereum Blockchain has a Transaction Hash associated with it, which can be verified on a Block Explorer such as Etherscan.io and which cannot be reverted. Thus, while creating a Supplier, a Manufacturer, or a Distributer, the corresponding Smart Contract method is invoked. Similarly, for listing Raw Materials and Products, and placing Raw Material Orders and Product Orders, the corresponding Smart Contract methods are invoked, leaving an immutable mark on the blockchain network and changing the state of the smart contract forever, which can easily be referred to for verification should there be any dispute between 2 or more parties.\n\n
            Utilizing "Events" offered by the Solidity Smart Contracts, Live Tracking and Inventory Management are further strengthened, leading to increased speed in decision-making.\n\n
            The project uniquely makes use of Web2.0 in combination with Web3.0 to realize the goals of Decentralized Authority without losing out on the speed of transactions. Every Smart Contract call is cached-in and stored in it's respective collection in a MongoDB cluster, there-by increasing the speeds of GET requests. However, should the centralized MongoDB database get compromised, then there is no loss of data as the entire backup is present immutably on the Ethereum Blockchain, which can be fetched easily by JSON-RPC calls to an RPC Endpoint provided by platforms such as Infura.\n\n
            The project is a REST API service developed using Node.js and Express.js, and written in JavaScript. To make JSON-RPC requests to the Infura RPC Endpoint, Ethers.js library is used.\n\n
            The Smart Contract has been written using Solidity and the environment used for it's development and deployment is Hardhat. The Smart Contract has been Deployed on the Sepolia Testnet.\n\n
            The first 3 section of the present documentation namely - Authentication, Raw Materials and Products, has API endpoints which correspond to the regular functionalities of any Supply Chain Management Platform. However, the fourth section, namely Blockchain Verify actually realises the goals of this project.\n\n
            Last part of the documentation, but not the least, deals with the MongoDB schemas of entities used in the project.`,
		},
		servers: [
			{
				url: "http://35.154.7.227:3000",
			},
		],
	},
	apis: ["./swagger/swaggerDoc.yml"],
}

const swaggerSpec = swaggerJsDoc(options)

module.exports = swaggerSpec