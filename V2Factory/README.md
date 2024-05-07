## User Guide

install dependencies
npm i

then compile the samrt contract code
npx hardhat compile

if you want to test the smart contract
npx hardhat test

then deploy the smart contract
npx hardhat run scripts/deploy.js --network <network_name>

then verify the smart contract

without constructor parameters
npx hardhat verify --network <network_name> <contract_address>

with constructor parameters
npx hardhat verify --network mumbai <contract_address> --constructor-args arguments.js

**Happy _building_!**
