import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import { NextFunction, Response, Request } from "express";
import router from "./routes";
import { handleError } from "./middlewares";

import connectDB from "./helpers/db-connection";
connectDB();

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
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).json(err);
// });
app.use(handleError);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
