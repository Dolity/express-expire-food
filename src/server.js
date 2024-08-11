require("dotenv").config({ path: "./.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./routes/indexRouter.js");
const logger = require("./helpers/logger.js");

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(bodyParser.json());

app.use("/api/v1", router);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
