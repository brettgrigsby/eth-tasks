import {
  Box,
  Heading,
  TableContainer,
  Tbody,
  Text,
  Tr,
  Table,
  Td,
  IconButton,
  ButtonGroup,
  Tooltip,
} from "@chakra-ui/react"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import type { Task } from "../types"
import { Contract } from "ethers"

type Props = {
  tasks: Task[]
  contract: Contract
  refetch: () => Promise<void>
}

function sortTasksByDueDate(a: Task, b: Task) {
  return a.dueDate.toNumber() - b.dueDate.toNumber()
}

const Tasks: React.FC<Props> = ({ tasks, contract, refetch }) => {
  const handleMarkCompleted = async (id: number) => {
    const tx = await contract.completeTask(id)
    await tx.wait()
    refetch()
  }

  const handleDeleteTask = async (id: number) => {
    const tx = await contract.deleteTask(id)
    await tx.wait()
    refetch()
  }

  const filteredTasks = tasks.filter((task) => !!task.name)

  if (filteredTasks.length === 0) {
    return (
      <Box p={4}>
        <Heading mb={4}>My Tasks</Heading>
        <Text>No tasks yet! Create a new task with the form to the left.</Text>
      </Box>
    )
  }

  return (
    <Box p={4}>
      <Heading mb={4}>My Tasks</Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Tbody>
            {filteredTasks.sort(sortTasksByDueDate).map((task) => (
              <Tr key={task.id.toNumber()}>
                <Td>
                  <Box mb={2}>
                    <Text mb={1} fontSize="xl">
                      {task.name}
                    </Text>
                    <Text ml={2} fontSize="sm">
                      {task.description}
                    </Text>
                  </Box>
                </Td>
                <Td>
                  <Text fontSize="sm">
                    {new Date(task.dueDate.toNumber()).toLocaleDateString()}
                  </Text>
                </Td>
                <Td>
                  <ButtonGroup>
                    <Tooltip
                      label={
                        task.completed ? "Task Complete!" : "Mark as completed"
                      }
                    >
                      <IconButton
                        isDisabled={task.completed}
                        aria-label="completed"
                        icon={<CheckIcon />}
                        color={task.completed ? "green.500" : "blue.500"}
                        onClick={() => handleMarkCompleted(task.id.toNumber())}
                      />
                    </Tooltip>
                    <Tooltip label="Delete Task">
                      <IconButton
                        aria-label="delete"
                        icon={<CloseIcon />}
                        color="red.500"
                        onClick={() => handleDeleteTask(task.id.toNumber())}
                      />
                    </Tooltip>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Tasks
