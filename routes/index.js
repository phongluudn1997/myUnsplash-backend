const express = require("express");
const router = express.Router();

router.get("/hello-world", (req, res) => {
  res.send("Hello World");
});
router.use("/user", require("./userAPI"));

module.exports = router;
