import { providers } from "ethers"
import { InjectedConnector } from "wagmi/connectors/injected"
import { hardhat } from "wagmi/chains"
import { createClient, WagmiConfig, useAccount, useNetwork } from "wagmi"
import WalletNotConnected from "./components/WalletNotConnected"
import WalletConnected from "./components/WalletConnected"
import SwitchNetwork from "./components/SwitchNetwork"
import { ChakraProvider } from "@chakra-ui/react"

const ethProvider = new providers.JsonRpcProvider(
  "http://127.0.0.1:8545",
  providers.getNetwork(31337)
)
const connector = new InjectedConnector({ chains: [hardhat] })

const client = createClient({
  autoConnect: true,
  provider: ethProvider,
  connectors: [connector],
})

function AppWrapper() {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <App />
      </WagmiConfig>
    </ChakraProvider>
  )
}

function App() {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  if (!isConnected) return <WalletNotConnected />
  if (chain?.id !== 31337) return <SwitchNetwork />

  return <WalletConnected />
}

export default AppWrapper
