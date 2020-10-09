const express = require("express");
const app = express();
require("dotenv/config");

const connectDB = require("./helpers/db-connection");
connectDB();

const bodyParser = require("body-parser");
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use("/api", require("./routes"));
app.use((err, req, res, next) => {
  res.status(500).json(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});