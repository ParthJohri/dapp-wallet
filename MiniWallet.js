require("dotenv").config();
const { Web3 } = require("web3");
const node = process.env["API_KEY"];
const web3 = new Web3(node);

const accountTo = web3.eth.accounts.create();
const privateKey = process.env["PRIVATE_KEY"];

const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);
const createSignedTx = async (rawTx) => {
  rawTx.gas = await web3.eth.estimateGas(rawTx);
  return await accountFrom.signTransaction(rawTx);
};

const sendSignedTx = async (signedTx) => {
  web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log);
};

const amountTo = "0.000001";

const rawTx = {
  from: accountFrom.address,
  to: accountTo.address,
  value: web3.utils.toWei(amountTo, "ether"),
};
createSignedTx(rawTx).then(sendSignedTx);
