const swaggerJsDoc = require('swagger-jsdoc')

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Supply Chain Management API",
			version: "1.0.0",
			description: "An API service that harnesses the strength of Ethereum Smart Contracts (Solidity) to enhance the current Supply Chain Management Process.",
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