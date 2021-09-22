const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const issueSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    user_id: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    collection: "issues",
  }
);

module.exports = mongoose.model("Issue", issueSchema);
