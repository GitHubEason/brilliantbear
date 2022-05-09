const express = require("express");
// const cors = require("cors");

const app = express();
app.use(express.json());
// app.use(cors());
const cors = (req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Methods", "*");
	next();
};
app.use(cors);
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
	return;
});
app.get("/tasks/:id", (req, res) => {
	const { id } = req.params;
	const task = tasks.find((e) => e.id == id);
	task ? res.json(task) : res.status(404).json({ error: "Task not found" });
	return;
});
app.post("/tasks", (req, res) => {
	const { description } = req.body;
	const task = new Task(_id, description);
	tasks.push(task);
	_id++;
	res.status(201).json(task);
	return;
});
app.put("/tasks/:id", (req, res) => {
	const { id } = req.params;
	const task = tasks.find((e) => e.id == id);
	if (!task) {
		res.status(404).json("Task not found");
		return;
	}
	const { description, done = false } = req.body;
	if (description) {
		task.description = description;
	}
	if (task) {
		task.done = !!done;
	}
	res.json(task);
	return;
});
app.delete("/tasks/:id", (req, res) => {
	const { id } = req.params;
	let index = tasks.findIndex((i) => i.id == id);
	if (index === -1) {
		res.status(404).json({ error: "Task not found" });
		return;
	}
	tasks.splice(index, 1);
	res.sendStatus(204);
	return;
});

app.listen(3000);
