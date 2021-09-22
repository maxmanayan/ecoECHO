// imports
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const router = express.Router();
const { err400, err403 } = require("../helpers/customErrors");

// routes
// REGISTER
router.post("/register", async (req, res, next) => {
  let registerInfo = {};
  if (
    req.body.username &&
    req.body.email &&
    req.body.password &&
    req.body.dateCreated
  ) {
    registerInfo = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      dateCreated: req.body.dateCreated,
    };
    try {
      const emailAlreadyUsed = await User.findOne({
        email: registerInfo.email,
      });
      if (emailAlreadyUsed) {
        next(new Error(`${registerInfo.email} already has an account`));
      } else {
        const user = new User(registerInfo);
        const newUser = await user.save();
        res.status(201).send(newUser);
      }
    } catch (error) {
      next(new Error(error.message));
    }
  } else {
    next(err400);
  }
});

// LOGIN
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        next(new Error(`${email} has not been registered`));
      } else {
        const matchingPassword = await bcrypt.compare(password, user.password);
        if (!matchingPassword) {
          next(err403);
        } else {
          const payload = {
            username: user.username,
            email: user.email,
            dateCreated: user.dateCreated,
          };
          const expiresIn = process.env.JWT_EXPIRES_IN;
          const options = { expiresIn: expiresIn };
          const secret = process.env.JWT_SECRET;

          const token = jwt.sign(payload, secret, options);
          const authenticatedUserObj = { token: token, user: user };

          res.status(200).send(authenticatedUserObj);
        }
      }
    } catch (error) {
      next(new Error(error.message));
    }
  } else {
    next(err400);
  }
});

// LOGOUT
router.delete("/logout", (req, res, next) => {
  try {
    res.status(200).send("Logout successful");
  } catch (error) {
    next(new Error(error.message));
  }
});

// exports
module.exports = router;
