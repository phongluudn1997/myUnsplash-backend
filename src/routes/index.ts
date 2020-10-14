import express from "express";
const router = express.Router();
import userRouter from "./userAPI";
import photoRouter from "./photoAPI";
import { OkResponse } from "../common/response/ok.response";

router.get("/hello-world", (req, res) => {
  return res.send("Hello World");
});

router.get("/", (req, res, next) => {
  return new OkResponse({}).send(res);
});

router.use("/user", userRouter);
router.use("/photo", photoRouter);

export default router;
