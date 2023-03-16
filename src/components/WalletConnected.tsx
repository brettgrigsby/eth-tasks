import { useCallback, useEffect, useState } from "react"
import type { Task } from "../types"
import { useContract, useSigner } from "wagmi"
import TasksArtifact from "../Tasks.json"
import Tasks from "./Tasks"
import ContractNotDeployed from "./ContractNotDeployed"
import CreateTask from "./CreateTask"
import { Flex, Box } from "@chakra-ui/react"

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

export default function WalletConnected() {
  const [contractDeployed, setContractDeployed] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const { data: signer } = useSigner()
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: TasksArtifact.abi,
    signerOrProvider: signer,
  })

  const checkContractDeployment = useCallback(async () => {
    if (!signer?.provider) return

    try {
      const contractCode = await signer?.provider?.getCode(CONTRACT_ADDRESS)
      if (contractCode === "0x") {
        setContractDeployed(false)
      } else {
        setContractDeployed(true)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }, [signer?.provider])

  const getTasks = useCallback(async () => {
    if (!contract) return

    const tasks = await contract.getTasks()
    setTasks(tasks)
  }, [contract])

  useEffect(() => {
    checkContractDeployment()
  }, [checkContractDeployment])

  useEffect(() => {
    if (!contractDeployed) return
    getTasks()
  }, [contract, getTasks, contractDeployed])

  if (!contractDeployed) return <ContractNotDeployed />

  if (!contract) return <div>Loading...</div>

  return (
    <Flex>
      <Box flex={1}>
        <CreateTask contract={contract} refetch={getTasks} />
      </Box>
      <Box flex={2}>
        <Tasks tasks={tasks} contract={contract} refetch={getTasks} />
      </Box>
    </Flex>
  )
}
