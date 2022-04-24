const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const tasks = [];
class Task {
	constructor(id, description) {
		this.id = id;
		this.description = description;
		this.done = false;
	}
}
let _id = 1;

app.get("/tasks", (req, res) => {
	const { description } = req.query;
	if (description) {
		const taskD = tasks.filter((e) => e.description.includes(description));
		res.json(taskD);
		return;
	}
	res.status(200).json(tasks);
});
app.get("/tasks/:id", (req, res) => {
	const { id } = req.params;
	const task = tasks.find((e) => e.id == id);
	task ? res.status(200).json(task) : res.status(404).json("Task not found");
});
app.post("/tasks", (req, res) => {
	const { description } = req.body;
	const task = new Task(_id, description);
	tasks.push(task);
	_id++;
	res.status(201).json(task);
});
app.put("/tasks/:id", (req, res) => {
	const { id } = req.params;
	const task = tasks.find((e) => e.id == id);
	if (task) {
		const { description, done = false } = req.body;
		task.description = description;
		task.done = done;
		res.status(200).json(task);
		return;
	}
	res.status(404).json("Task not found");
});
app.delete("/tasks/:id", (req, res) => {
	const { id } = req.params;
	let index = tasks.findIndex((i) => i.id == id);
	index = index + 1;
	if (index) {
		tasks.splice(index - 1, 1);
		res.status(204).json("The task successfully deleted");
		return;
	}
	res.status(404).json("Task not found");
});

app.listen(3000);
