const assert = require("assert");
const ganache = require("ganache-cli");
const { beforeEach } = require("mocha");
const { it } = require("mocha");
const { describe } = require("mocha");
const path = require("path");

// Web3 is constructor
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { evm, abi } = require("../compile");

// Mocha testing(commented)
// class Car {
//   park() {
//     return "Stopped";
//   }
//   drive() {
//     return "Vroom";
//   }
// }

// let car;

// // Runs before each it statement
// beforeEach(() => {
//   console.log("Starting new test");
//   // Create instace of Class
//   car = new Car();
// });

// // Set any name for the test
// // Describe is used to group it statements
// describe("test_car", () => {
//   // set a name for a function
//   it("can park", () => {
//     // Set function name and the value it should return
//     assert.equal(car.park(), "Stopped");
//   });
//   it("can run", () => {
//     assert.equal(car.drive(), "Vroom");
//   });
// });

console.log("---->Bytecode", typeof evm.bytecode.object);

let accounts;
let inbox;
beforeEach(async () => {
  // Get list of all accounts
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Hello"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("Deploy a contract", () => {
    // console.log(inbox);
    assert.ok(inbox.options.address);
  });

  it("read data", async () => {
    const message = await inbox.methods.message().call();
  });

  it("Change message", async () => {
    await inbox.methods.set_mess("Hello").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hello");
  });
});
