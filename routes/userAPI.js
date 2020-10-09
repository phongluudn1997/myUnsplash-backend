const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");
const SALT = 10;

router.post("/register", async (req, res, next) => {
  const {
    email,
    password,
    nickname
  } = req.body;

  const existedUser = await User.findOne({
    email
  }).exec();
  if (existedUser) {
    return res.status(400).json({
      message: "Email already been registered!",
    });
  }
  const hashedPassword = await bcrypt.hash(password, SALT);
  const newUser = new User({
    email,
    password: hashedPassword,
    nickname
  });
  newUser
    .save()
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        message: "Register successfully!",
        email,
      });
    })
    .catch((err) => next(err));
});

module.exports = router;