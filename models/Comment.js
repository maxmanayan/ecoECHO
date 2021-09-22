const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema(
  {
    description: String,
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    user_id: {
      type: ObjectId,
      ref: "User",
    },
    issue_id: {
      type: ObjectId,
      ref: "Issue",
    },
  },
  {
    collection: "comments",
  }
);

module.exports = mongoose.model("Comment", commentSchema);
