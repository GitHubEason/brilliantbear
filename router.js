const express = require("express");
const app = express();
const userRouter = express.Router();

app.get("/", (req, res) => {
	res.send("Hello");
});

app.use("/v1", userRouter);
userRouter.get("/", (req, res) => {
	res.send("user");
});
app.listen(5000, () => {
	console.log("3001");
});
