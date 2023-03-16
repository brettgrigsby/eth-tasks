# Ethereum Task Manager

## Project Setup

### Install dependencies

```bash
npm install
```

### Spin up the local blockchain

```bash
npx hardhat node
```

You will see a list of accounts with private keys. Copy the private key of one of the accounts.

### Wallet setup

Use the private key to import the account into Metamask, then add the network `http://localhost:8545` to Metamask with Chain ID: 31337.

### Deploy the contract

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Run the frontend

```bash
npm run start
```

## Testing

```bash
npx hardhat test
```
