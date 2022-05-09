const express = require("express");
const cors = require("./middleware/cors");
const router = require("./routes");
// const cors = require("cors");
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors);
app.use(router);
app.listen(PORT, () => {
	console.log(`start service port ${PORT}`);
});
// app.use(cors());
