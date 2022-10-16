const Web3 = require("web3");
const web3 = new Web3(
  "wss://wss.api.moonbase.moonbeam.network"
);

web3.eth
  .subscribe(
    "logs",
    {
      address:
        "0x27f8b0382Ac57a241fbaE8a4b3D3F4B804794d18",
      topics: [
        "0x64f50d594c2a739c7088f9fc6785e1934030e17b52f1a894baec61b98633a59f",
      ],
    },
    (error, result) => {
      if (error) console.error(error);
    }
  )
  .on("connected", function (subscriptionId) {
    console.log(subscriptionId);
  })
  .on("data", function (log) {
    console.log(log);
  });
