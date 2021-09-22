const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const voteSchema = new mongoose.Schema(
  {
    upvoted: Boolean,
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
    collection: "votes",
  }
);

module.exports = mongoose.model("Vote", voteSchema);
