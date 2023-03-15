const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts with the account:", deployer.address)

  const BrettTasks = await ethers.getContractFactory("BrettTasks")
  const brettTasks = await BrettTasks.deploy()
  console.log("BrettTasks contract deployed to:", brettTasks.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
