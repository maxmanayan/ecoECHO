require("dotenv").config();
const jwt = require("jsonwebtoken");
const { err401 } = require("./customErrors");

const validateToken = async (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const options = {
      expiresIn: process.env.JWT_EXPIRES_IN,
    };
    try {
      const verifiedToken = await jwt.verify(
        token,
        process.env.JWT_SECRET,
        options
      );
      req.decoded = verifiedToken;
      return req.decoded;
    } catch (error) {
      console.log(new Error(error.message));
    }
  } else {
    console.log(err401);
  }
};

module.exports = { validateToken };
