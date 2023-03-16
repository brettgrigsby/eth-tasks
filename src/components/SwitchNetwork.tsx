import { useSwitchNetwork } from "wagmi"
import { Button, Flex, Text } from "@chakra-ui/react"

export default function SwitchNetwork() {
  const { error, isLoading, switchNetwork } = useSwitchNetwork()

  const handleSwitchNetwork = async () => {
    if (!switchNetwork) return
    try {
      await switchNetwork(31337)
    } catch (error) {
      console.log("Error switching to the local Hardhat node:", error)
    }
  }

  return (
    <Flex flexDirection="column" justify="center" align="center" height="100vh">
      <Text fontSize="2xl" fontWeight="bold">
        You are connected to the wrong network.
      </Text>
      <Text mb={4}>
        Please switch to the local Hardhat node's network by clicking the button
        below.
      </Text>
      <Button onClick={handleSwitchNetwork} disabled={isLoading}>
        Switch Network
      </Button>
      {error && <Text>{error.message}</Text>}
      {isLoading && <Text>Loading...</Text>}
    </Flex>
  )
}
