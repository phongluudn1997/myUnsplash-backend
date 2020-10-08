const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const connectDB = () => {
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", () => {
    console.log("Database connected successfully!");
  });
};

module.exports = connectDB;
