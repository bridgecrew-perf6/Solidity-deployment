const path = require("path");
const fs = require("fs");
const solc = require("solc");
const { Console } = require("console");

const inboxPath = path.resolve(__dirname, "contracts", "inbox.sol");
const inbPath = path.resolve(__dirname, "contracts");
const source = fs.readFileSync(inboxPath, "utf8");

// solc.compile(source,1);
var input = {
  language: "Solidity",
  sources: {
    "inbox.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));
if (output.errors) {
  output.errors.forEach((err) => {
    console.log(err.formattedMessage);
  });
} else {
  const contracts = output.contracts["inbox.sol"];
  //   console.log(contracts["Inbox"]);
  module.exports = contracts["Inbox"];
  //   for (let contractName in contracts) {
  //     const contract = contracts[contractName];
  //     console.log(contract[":Inbox"]);
  //     // module.exports = contract[":Inbox"]
  //     // fs.writeFileSync(
  //     //   path.resolve(inbPath, `${contractName}.json`),
  //     //   JSON.stringify(contract.abi, null, 2),
  //     //   "utf8"
  //     // );
  //     // (module.exports = path.resolve(inboxPath, `${contractName}.json`)),
  //     //   JSON.stringify(contract.abi, null, 2),
  //     //   "utf8";
  //   }
}
