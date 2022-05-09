const express = require("express");
const { getAllTasks, getTaskById, updateTaskById, deleteTaskById, creatTask } = require("../controllers/tasks");
const checkTaskExist = require("../middleware/checkTaskExist");
const parseId = require("../middleware/parseId");
const taskRouter = express.Router();

taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", parseId, checkTaskExist, getTaskById);
taskRouter.put("/:id", parseId, checkTaskExist, updateTaskById);
taskRouter.delete("/:id", parseId, checkTaskExist, deleteTaskById);
taskRouter.post("", creatTask);

module.exports = taskRouter;
