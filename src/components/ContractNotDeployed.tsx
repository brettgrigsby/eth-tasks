import { Code, Flex, Text } from "@chakra-ui/react"

export default function ContractNotDeployed() {
  return (
    <Flex height="100vh" align="center" justify="center" flexDirection="column">
      <Text fontSize="2xl" mb={2} fontWeight="bold">
        The Tasks contract has not been deployed
      </Text>
      <Text mb={6}>
        Run the following command from the project folder and refresh the page
      </Text>
      <Code
        py={2}
        px={1}
        borderRadius="sm"
        children="npx hardhat run scripts/deploy.js --network localhost"
      />
    </Flex>
  )
}
