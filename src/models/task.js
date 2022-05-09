const tasks = [];
class Task {
	constructor(id, description) {
		this.id = id;
		this.description = description;
		this.done = false;
	}
}
let _id = 1;

const getAllTasks = ({ description }) => {
	if (description) {
		const taskD = tasks.filter((e) => e.description.includes(description));
		return taskD;
	}
	return tasks;
};

const getTaskById = (id) => {
	const task = tasks.find((e) => e.id === id);
	return task;
};
//task must exist
const updateTaskById = (id, { done, description }) => {
	const task = tasks.find((e) => e.id === id);
	if (description) {
		task.description = description;
	}
	if (done !== undefined) {
		task.done = !!done;
	}
	return task;
};

const addTask = ({ description }) => {
	const task = new Task(_id, description);
	tasks.push(task);
	_id++;
	return task;
};

const deleteTaskById = (id) => {
	let index = tasks.findIndex((i) => i.id === id);
	tasks.splice(index, 1);
	return;
};

module.exports = {
	getAllTasks,
	getTaskById,
	updateTaskById,
	deleteTaskById,
	addTask,
};
