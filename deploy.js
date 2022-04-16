const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { evm, abi } = require("./compile");
require("dotenv").config();

let mnemonic = process.env.MNEMONIC;
let api = process.env.API;

const provider = new HDWalletProvider(mnemonic, api);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Account", accounts[0]);
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Hello"] })
    .send({ gas: "1000000", from: accounts[0] });
  console.log("Contract deployed, address:", result.options.address);
  provider.engine.stop();
};
deploy();
