const Web3 = require("web3");

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
  development: "http://localhost:9933",
  moonbase:
    "https://rpc.api.moonbase.moonbeam.network",
};
const web3 = new Web3(providerRPC.moonbase); //Change to correct network

const account_from = {
  privateKey:
    "7cc0e8fa471aecd0b57c6617459f1b8ad9162d8e40e821d6e7c8f977e32d03bf",
  address:
    "0x4bbd2A03A0aD7449EB273f4385cE25E9D2c8D8fE",
};
const addressTo =
  "0x3aCaAB9fE5b1FCEf389963E12B9B3D014cc3610A"; // Change addressTo

/*
   -- Create and Deploy Transaction --
*/
const deploy = async () => {
  console.log(
    `Attempting to send transaction from ${account_from.address} to ${addressTo}`
  );

  // Sign Tx with PK
  const createTransaction =
    await web3.eth.accounts.signTransaction(
      {
        gas: 21000,
        to: addressTo,
        value: web3.utils.toWei("1", "ether"),
      },
      account_from.privateKey
    );

  // Send Tx and Wait for Receipt
  const createReceipt =
    await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
    );
  console.log(
    `Transaction successful with hash: ${createReceipt.transactionHash}`
  );
};

deploy();
