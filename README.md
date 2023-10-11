
# Supply Chain Management Backend (Node.js)

This Node.js project is a REST API service that performs various tasks of the Supply Chain Management process by means of API calls.
 




## Documentation

[Swagger API Documentation](http://35.154.7.227:3000/docs/)


## Features

- The project follows an MVC (Model-View-Controller) pattern, with the following project structure: 
    - `./contracts/Contract.js` - It sets up a connection to an Ethereum network and initializes a contract instance to interact with a smart contract. It uses the **ethers.js** library to establish a connection to the network, configure the environment variables, and create a signer using a private key. It also imports the contract ABI and creates an instance of the contract using the contract address, ABI, and signer. The resulting contract object is exported for use in other parts of the codebase.
    - `./contracts/MainContractABI.json` - Contains the Application Binary Interface (ABI) of the Smart Contract.
    - `./controllers/` - Contains all the controllers for each of the routes defined in `./routes/`.
    - `./middleware/` - Contains middlewares for JWT Token generation/validation.
    - `./models/` - Contains mongoose schemas for the corresponding MongoDB collections.
    - `./routes/` - Express Routers which define all the endpoints and their corresponding HTTP request type.
    - `./swagger/` - Contains Swagger API Documentation.
    - `app.js` - Runs the Express.js server and starts listening to a `PORT`.
- Database - MongoDB Atlas



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` - The port number on which the server should listen.

`MONGO_DEV_URI` - The MongoDB Atlas Cluster Connection string.

`JWT_SECRET` - The JWT Secret phrase for generating/validating JWT Auth Tokens.

`SEPOLIA_CONTRACT_ADDRESS` - The address of the deployed Smart Contract on the Sepolia Ethereum Network.

`SEPOLIA_RPC_URL` - An RPC Endpoint that can be obtained from Infura, Zeeve.io, etc for the testnet SEPOLIA.

`SEPOLIA_PRIVATE_KEY` - The private key to a SEPOLIA Externally Owned Account (EOA).


## Run Locally

Clone the project

```bash
  git clone https://github.com/SupplyChainManagementProject/SupplyChainManagementBackend.git
```

Go to the project directory

```bash
  cd SupplyChainManagementBackend/
```

Install dependencies

```bash
  npm install
```

Start Express.js Server

```bash
  npm start
```


## Contributing

Contributions are always welcome!

If you'd like to contribute to this project, please follow these steps:

- Fork the repository on GitHub.
- Create a new branch with a descriptive name.
- Make your changes and test thoroughly.
- Commit your changes with clear and concise messages.
- Push your branch to your forked repository.
- Submit a pull request detailing your changes.


## License

The project is licensed under [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).

