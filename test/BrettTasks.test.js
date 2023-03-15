/* eslint-disable jest/valid-expect */

const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("BrettTasks", function () {
  let Tasks, tasks, owner, addr1, addr2

  beforeEach(async () => {
    Tasks = await ethers.getContractFactory("BrettTasks")
    tasks = await Tasks.deploy()
    ;[owner, addr1, addr2] = await ethers.getSigners()
  })

  it("Should create a new task", async function () {
    await tasks
      .connect(owner)
      .createTask("Test Task", "Test Description", 1629340800)

    const task = await tasks.getTask(0)
    expect(task.name).to.equal("Test Task")
    expect(task.description).to.equal("Test Description")
    expect(task.dueDate).to.equal(1629340800)
  })

  it("Should complete a task", async function () {
    await tasks
      .connect(owner)
      .createTask("Test Task", "Test Description", 1629340800)
    await tasks.connect(owner).completeTask(0)

    const task = await tasks.getTask(0)
    expect(task.completed).to.equal(true)
  })

  it("Should delete a completed task", async function () {
    await tasks
      .connect(owner)
      .createTask("Test Task", "Test Description", 1629340800)
    await tasks.connect(owner).completeTask(0)
    await tasks.connect(owner).deleteTask(0)

    const task = await tasks.getTask(0)
    expect(task.id).to.equal(0)
    expect(task.name).to.equal("")
    expect(task.description).to.equal("")
  })

  it("Should get all tasks", async function () {
    await tasks.connect(owner).createTask("Task 1", "Description 1", 1629340800)
    await tasks.connect(owner).createTask("Task 2", "Description 2", 1629340800)

    const taskList = await tasks.connect(owner).getTasks()
    expect(taskList.length).to.equal(2)
    expect(taskList[0].name).to.equal("Task 1")
    expect(taskList[1].name).to.equal("Task 2")
  })
})
