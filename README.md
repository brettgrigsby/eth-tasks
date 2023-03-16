# Ethereum Task Manager

<img width="1038" alt="Screen Shot 2023-03-15 at 8 27 07 PM" src="https://user-images.githubusercontent.com/8657755/225494162-7de85637-9693-43f5-92ff-8f70bb24eb2b.png">

## Project Setup

### Install dependencies

```bash
npm install
```

### Spin up the local blockchain

```bash
npx hardhat
npx hardhat node
```

You will see a list of accounts with private keys. Copy the private key of one of the accounts.

### Wallet setup

Use the private key to import the account into Metamask, then add the network `http://localhost:8545` to Metamask with Chain ID: 31337.

<img width="335" alt="Screen Shot 2023-03-15 at 7 55 37 PM" src="https://user-images.githubusercontent.com/8657755/225492015-94ef5ec3-ee65-4a45-abd8-c70b9048c8c0.png">

### Deploy the contract

```bash
npx hardhat run scripts/deploy.js --network localhost
```

In the logs, you will see the address of the deployed contract. Copy this address.

```bash
eth_sendTransaction
  Contract deployment: Tasks
  Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3 <-- copy this address
  Transaction:         0x1c0dac55491f4d5797de295dc98f1280da05ca43d613ad95836ed0b40834895c
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            994969 of 994969
  Block #1:            0x10a0775985ccbc553665022ed45cdf3817c805e1c5447b3c190a1cd5ee986c91
```

If this address differs from the existing value for `REACT_APP_CONTRACT_ADDRESS` in the `.env` file, update the value with the new address.

### Run the frontend

```bash
npm run start
```

## Testing

```bash
npx hardhat test
```

## What's Lacking?

- [ ] Tests for the frontend
- [ ] Better error handling
- [ ] Scope contract functions to address of caller
- [ ] Dates are 1 day off
