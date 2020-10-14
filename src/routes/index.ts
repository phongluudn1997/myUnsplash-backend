import express from "express";
const router = express.Router();
import userRouter from "./userAPI";
import photoRouter from "./photoAPI";

router.get("/hello-world", (req, res) => {
  return res.send("Hello World");
});

router.use("/user", userRouter);
router.use("/photo", photoRouter);

export default router;
