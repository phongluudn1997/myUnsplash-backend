import express from "express";
import BadRequestError from "../common/errors/bad-request-error";
const router = express.Router();
import userRouter from "./userAPI";

router.get("/hello-world", (req, res) => {
  return res.send("Hello World");
});
router.use("/user", userRouter);

export default router;
