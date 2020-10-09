import express from "express";
import BadRequestError from "../common/errors/bad-request-error";
const router = express.Router();
import userRouter from "./userAPI";

router.get("/hello-world", (req, res) => {
  throw new BadRequestError();
});
router.use("/user", userRouter);

export default router;
