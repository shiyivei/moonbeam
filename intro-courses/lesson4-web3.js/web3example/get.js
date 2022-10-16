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
const contractAddress =
  "0x27f8b0382Ac57a241fbaE8a4b3D3F4B804794d18";

/*
   -- Call Function --
*/
// Create Contract Instance
const incrementer = new web3.eth.Contract(
  abi,
  contractAddress
);

const get = async () => {
  console.log(
    `Making a call to contract at address: ${contractAddress}`
  );

  // Call Contract
  const data = await incrementer.methods
    .number()
    .call();

  console.log(
    `The current number stored is: ${data}`
  );
};

get();
