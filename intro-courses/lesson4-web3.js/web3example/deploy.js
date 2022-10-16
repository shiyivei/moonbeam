const Web3 = require("web3");
const contractFile = require("./compile");

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
  development: "http://localhost:9933",
  moonbase:
    //     "https://rpc.api.moonbase.moonbeam.network",
    "https://rpc.testnet.moonbeam.network",
};
const web3 = new Web3(providerRPC.moonbase); //Change to correct network

// Variables
const account_from = {
  privateKey:
    "7cc0e8fa471aecd0b57c6617459f1b8ad9162d8e40e821d6e7c8f977e32d03bf",
  address:
    "0x4bbd2A03A0aD7449EB273f4385cE25E9D2c8D8fE",
};

const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

/*
   -- Deploy Contract --
*/
const deploy = async () => {
  console.log(
    `Attempting to deploy from account ${account_from.address}`
  );

  // Create Contract Instance
  const incrementer = new web3.eth.Contract(abi);

  // Create Constructor Tx
  const incrementerTx = incrementer.deploy({
    data: bytecode,
    arguments: [5],
  });

  // Sign Transacation and Send
  const createTransaction =
    await web3.eth.accounts.signTransaction(
      {
        data: incrementerTx.encodeABI(),
        gas: await incrementerTx.estimateGas(),
      },
      account_from.privateKey
    );

  // Send Tx and Wait for Receipt
  const createReceipt =
    await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
    );
  console.log(
    `Contract deployed at address: ${createReceipt.contractAddress}`
  );
};

deploy();
