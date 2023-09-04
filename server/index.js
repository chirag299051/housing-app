const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const AuthRoutes = require("./Routes/AuthRoutes");
const UserRoutes = require("./Routes/UserRoutes");
var bodyParser = require("body-parser");

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.API_PORT;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const buildPath = path.join(__dirname, "../app/build");
app.use(express.static(buildPath));

app.use("/", AuthRoutes);
app.use("/", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port : ${PORT}`);
});
