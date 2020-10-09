const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const SALT = 10;
const privateKey = process.env.PRIVATE_KEY || "";

router.post("/register", async (req, res, next) => {
  const { email, password, nickname } = req.body;

  try {
    const existedUser = await User.findOne({
      email,
    }).exec();
    if (existedUser) {
      return res.status(400).json({
        message: "Email already been registered!",
      });
    }
  } catch (error) {
    next(error);
  }

  const hashedPassword = await bcrypt.hash(password, SALT);
  const newUser = new User({
    email,
    password: hashedPassword,
    nickname,
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

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required!",
    });
  }

  try {
    const user = await User.findOne({
      email,
    }).exec();
    if (!user) {
      return res.status(400).json({
        message: "The email hasn't been registered!",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        message: "Wrong password!",
      });
    }

    try {
      const token = await jwt.sign(
        {
          userId: user._id,
        },
        privateKey
      );
      return res.status(200).json({
        message: "Login successfully!",
        token,
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
