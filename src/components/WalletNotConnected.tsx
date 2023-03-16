import { useConnect } from "wagmi"
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"

export default function WalletNotConnected() {
  const { connect, connectors } = useConnect()

  const handleConnect = async () => {
    try {
      connect({ connector: connectors[0] })
    } catch (error) {
      console.log("Error connecting to the local Hardhat node:", error)
    }
  }

  return (
    <Flex justify="center" align="center" flexDirection="column" height="100vh">
      <Heading>Welcome to Ethereum Task Manager</Heading>
      <Text>Click the button below to connect your wallet.</Text>
      <Button onClick={handleConnect} mt={4}>
        Connect Wallet
      </Button>
    </Flex>
  )
}
