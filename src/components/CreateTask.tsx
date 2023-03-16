import { Box, Input, Heading, Stack, Button } from "@chakra-ui/react"
import { Contract } from "ethers"
import { useState, type ChangeEventHandler } from "react"

type Props = {
  contract: Contract
  refetch: () => Promise<void>
}

const CreateTask: React.FC<Props> = ({ contract, refetch }) => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    dueDate: "",
  })

  const handleChange: (key: string) => ChangeEventHandler<HTMLInputElement> =
    (key) => (event) => {
      const newValue = event.target.value
      setFormState((prevState) => ({ ...prevState, [key]: newValue }))
    }

  const handleCreateTask = async () => {
    const { name, description, dueDate } = formState
    if (!name || !description || !dueDate) return

    const timestamp = new Date(dueDate).getTime()
    const tx = await contract.createTask(name, description, timestamp)

    // should handle transaction not getting mined here
    await tx.wait()

    setFormState({ name: "", description: "", dueDate: "" })
    refetch()
  }

  return (
    <Box p={4} borderRight="1px solid #36454f" height="100vh">
      <Heading mb={4}>Create Task</Heading>
      <Stack>
        <Input
          value={formState.name}
          placeholder="Name"
          onChange={handleChange("name")}
        />
        <Input
          value={formState.description}
          placeholder="Description"
          onChange={handleChange("description")}
        />
        <Input
          type="date"
          value={formState.dueDate}
          onChange={handleChange("dueDate")}
        />
      </Stack>
      <Button w="full" mt={4} onClick={handleCreateTask}>
        Create Task
      </Button>
    </Box>
  )
}

export default CreateTask
