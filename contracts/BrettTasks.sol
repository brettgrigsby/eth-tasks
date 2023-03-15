// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BrettTasks {
    struct Task {
        uint256 id;
        string name;
        string description;
        uint256 dueDate;
        bool completed;
    }

    uint256 private nextTaskId;
    mapping(uint256 => Task) private tasks;

    event TaskCreated(uint256 indexed id, string name, string description, uint256 dueDate);
    event TaskCompleted(uint256 indexed id);
    event TaskDeleted(uint256 indexed id);

    function createTask(string calldata name, string calldata description, uint256 dueDate) external {
        tasks[nextTaskId] = Task(nextTaskId, name, description, dueDate, false);
        emit TaskCreated(nextTaskId, name, description, dueDate);
        nextTaskId++;
    }

    function completeTask(uint256 id) external {
        require(!tasks[id].completed, "Task is already completed");
        tasks[id].completed = true;
        emit TaskCompleted(id);
    }

    function deleteTask(uint256 id) external {
        require(tasks[id].completed, "Cannot delete an incomplete task");
        delete tasks[id];
        emit TaskDeleted(id);
    }

    function getTask(uint256 id) external view returns (Task memory) {
        return tasks[id];
    }

    function getTasks() external view returns (Task[] memory) {
        uint256 taskCount = nextTaskId;
        console.log("taskCount: %s", taskCount);
        Task[] memory taskList = new Task[](taskCount);

        for (uint256 i = 0; i < taskCount; i++) {
            taskList[i] = tasks[i];
        }

        console.log("taskList length: %s", taskList.length);

        return taskList;
    }
}
