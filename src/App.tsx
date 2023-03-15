import logo from "./logo.svg"
import "./App.css"
import { ethers, providers, Contract } from "ethers"
import TasksABI from "./BrettTasks.json"
import { Web3ReactProvider, useWeb3React } from "@web3-react/core"
import { injectedConnector } from "./web3"

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

function getLibrary(provider: providers.ExternalProvider) {
  return new ethers.providers.Web3Provider(provider)
}

function AppWrapper() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  )
}

function App() {
  const { activate, active, library, chainId, account } = useWeb3React()

  const connect = async () => {
    console.log("Connecting to the local Hardhat node...")
    try {
      await activate(injectedConnector)
    } catch (error) {
      console.log("Error connecting to the local Hardhat node:", error)
    }
  }

  const createTask = async () => {
    if (!active) {
      console.log("Please connect to the local Hardhat node first")
      return
    }
    const contract = new Contract(
      CONTRACT_ADDRESS,
      TasksABI.abi,
      library.getSigner()
    )
    if (!contract) {
      console.log("Could not find contract")
      return
    }
    const name = "Sample Task"
    const description = "This is a sample task"
    const dueDate = Math.floor(new Date().getTime() / 1000) + 86400 // Current timestamp + 1 day

    const tx = await contract.createTask(name, description, dueDate)
    await tx.wait()
    console.log("Task created!")
  }

  const getTasks = async () => {
    if (!active) {
      console.log("Please connect to the local Hardhat node first")
      return
    }
    const contract = new Contract(
      CONTRACT_ADDRESS,
      TasksABI.abi,
      library.getSigner()
    )
    if (!contract) {
      console.log("Could not find contract")
      return
    }

    console.log({ contract, functions: contract.functions })
    const tasks = await contract.getTasks()
    console.log({ tasks })
  }

  const getTask = async () => {
    if (!active) {
      console.log("Please connect to the local Hardhat node first")
      return
    }
    const contract = new Contract(
      CONTRACT_ADDRESS,
      TasksABI.abi,
      library.getSigner()
    )
    if (!contract) {
      console.log("Could not find contract")
      return
    }
    const task = await contract.getTask(1)
    console.log({ task })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={connect}>Connect</button>
        <button onClick={createTask}>Create Task</button>
        <button onClick={getTasks}>Get Tasks</button>
        <button onClick={getTask}>Get Task</button>
      </header>
    </div>
  )
}

export default AppWrapper
