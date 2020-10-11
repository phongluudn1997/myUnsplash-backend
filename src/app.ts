import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import router from "./routes";
import { asyncHandler, handleError } from "./middlewares";

const bodyParser = require("body-parser");
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use("/api", router);

app.use(handleError);

export default app;
