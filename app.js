const express = require("express");
const app = express();
require("dotenv/config");

const connectDB = require("./helpers/db-connection");
connectDB();

app.use("/api", require("./routes"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
