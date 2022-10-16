const Web3 = require("web3");
const { abi } = require("./compile");

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
  development: "http://localhost:9933",
  moonbase:
    "https://rpc.testnet.moonbeam.network",
};
const web3 = new Web3(providerRPC.moonbase); //Change to correct network

// Variables
const account_from = {
  privateKey:
    "7cc0e8fa471aecd0b57c6617459f1b8ad9162d8e40e821d6e7c8f977e32d03bf",
};
const contractAddress =
  "0x27f8b0382Ac57a241fbaE8a4b3D3F4B804794d18";
const _value = 3;

/*
   -- Send Function --
*/
// Create Contract Instance
const incrementer = new web3.eth.Contract(
  abi,
  contractAddress
);

// Build Increment Tx
const incrementTx =
  incrementer.methods.increment(_value);

const increment = async () => {
  console.log(
    `Calling the increment by ${_value} function in contract at address: ${contractAddress}`
  );

  // Sign Tx with PK
  const createTransaction =
    await web3.eth.accounts.signTransaction(
      {
        to: contractAddress,
        data: incrementTx.encodeABI(),
        gas: await incrementTx.estimateGas(),
      },
      account_from.privateKey
    );

  // Send Tx and Wait for Receipt
  const createReceipt =
    await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
    );
  console.log(
    `Tx successful with hash: ${createReceipt.transactionHash}`
  );
};

increment();
