const Task = require("../models/task");
const getAllTasks = (req, res) => {
	const { description } = req.query;
	const tasks = Task.getAllTasks({ description });
	res.json(tasks);
};
const getTaskById = (req, res) => {
	const { id } = req.params;
	const task = Task.getTaskById(id);
	task ? res.json(task) : res.status(404).json({ error: "Task not found" });
};
const updateTaskById = (req, res) => {
	const { id } = req.params;
	const { description, done } = req.body;
	const task = Task.updateTaskById(id, { description, done });
	res.json(task);
};
const creatTask = (req, res) => {
	const { description } = req.body;
	if (!description) {
		return res.status(400).json({ error: "You must provide a description" });
	}
	const task = Task.addTask({ description });
	res.status(201).json(task);
};
const deleteTaskById = (req, res) => {
	const { id } = req.params;
	Task.deleteTaskById(id);
	res.sendStatus(204);
};

module.exports = {
	getAllTasks,
	getTaskById,
	updateTaskById,
	deleteTaskById,
	creatTask,
};
