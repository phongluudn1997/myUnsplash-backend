import express from "express";
const router = express.Router();
import userRouter from "./userAPI";

router.get("/hello-world", (req, res) => {
  res.send("Hello World");
});
router.use("/user", userRouter);

export default router;
