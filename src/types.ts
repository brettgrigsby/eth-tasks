import { BigNumber } from "ethers"

export type Task = {
  id: BigNumber
  name: string
  description: string
  dueDate: BigNumber
  completed: boolean
}
