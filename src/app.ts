import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import router from "./routes";
import { handleError } from "./middlewares";
import cors from "cors";

const bodyParser = require("body-parser");
app.use(cors());
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
