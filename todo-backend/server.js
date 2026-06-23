const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const connectDB = require("./db");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todo-routes")

dotenv.config()

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());

app.use('/api', todoRoutes)

connectDB()

module.exports = app; 