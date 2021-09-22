const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);

// hashing and salting password on user creation
userSchema.pre("save", async function (next) {
  const user = this;
  const saltingRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltingRounds);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error.message);
  }
});

module.exports = mongoose.model("User", userSchema);
