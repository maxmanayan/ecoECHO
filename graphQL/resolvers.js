const User = require("../models/User");
const Issue = require("../models/Issue");
const Comment = require("../models/Comment");
const Vote = require("../models/Vote");

const resolvers = {
  Query: {
    // USERS
    async getAllUsers(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let res = await User.find();

          let users = res.map(async (user) => {
            user["issues"] = await Issue.find({ user_id: user._id });
            user["comments"] = await Comment.find({ user_id: user._id });
            user["votes"] = await Vote.find({ user_id: user._id });
            return user;
          });

          return users;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    async getUserByID(parent, { _id }, { authenticated }) {
      if (authenticated) {
        try {
          let user = await User.findById(_id);
          user["issues"] = await this.getUserIssues(
            parent,
            { user_id: user._id },
            { authenticated }
          );
          user["comments"] = await Comment.find({ user_id: user._id });
          user["votes"] = await Vote.find({ user_id: user._id });
          return user;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No Token");
      }
    },
    // ISSUES
    async getAllIssues(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let res = await Issue.find();

          let issues = res.map(async (issue) => {
            issue["user"] = await User.findById({ _id: issue.user_id });
            issue["comments"] = await Comment.find({ issue_id: issue._id });
            issue["votes"] = await Vote.find({ issue_id: issue._id });
            return issue;
          });

          return issues;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    async getUserIssues(parent, { user_id }, { authenticated }) {
      if (authenticated) {
        try {
          let res = await Issue.find({ user_id: user_id });
          let issues = res.map(async (issue) => {
            issue["user"] = await User.findById({ _id: issue.user_id });
            issue["comments"] = await Comment.find({ issue_id: issue._id });
            issue["votes"] = await Vote.find({ issue_id: issue._id });
            return issue;
          });

          return issues;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    async getIssueByID(parent, { _id }, { authenticated }) {
      if (authenticated) {
        try {
          let issue = await Issue.findById(_id);
          issue["user"] = await User.findById({ _id: issue.user_id });
          issue["comments"] = await this.getIssueComments(
            parent,
            { issue_id: issue._id },
            { authenticated }
          );
          issue["votes"] = await Vote.find({ issue_id: issue._id });
          return issue;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No Token");
      }
    },
    // Comments
    async getAllComments(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let res = await Comment.find();

          let comments = res.map(async (comment) => {
            comment["user"] = await User.findById({ _id: comment.user_id });
            comment["issue"] = await Issue.findById({ _id: comment.issue_id });

            return comment;
          });

          return comments;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    async getCommentByID(parent, { _id }, { authenticated }) {
      if (authenticated) {
        try {
          let comment = await Comment.findById(_id);
          comment["user"] = await User.findById({ _id: comment.user_id });
          comment["issue"] = await Issue.findById({ _id: comment.issue_id });
          return comment;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No Token");
      }
    },

    async getIssueComments(parent, { issue_id }, { authenticated }) {
      if (authenticated) {
        try {
          let res = await Comment.find({ issue_id: issue_id });

          let comments = res.map(async (comment) => {
            comment["user"] = await User.findById({ _id: comment.user_id });
            comment["issue"] = await Issue.findById({ _id: comment.issue_id });

            return comment;
          });

          return comments;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    // VOTES
    async getAllVotes(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let res = await Vote.find();

          let votes = res.map(async (vote) => {
            vote["user"] = await User.findById({ _id: vote.user_id });
            vote["issue"] = await Issue.findById({ _id: vote.issue_id });
            return vote;
          });

          return votes;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    async getVoteByID(parent, { _id }, { authenticated }) {
      if (authenticated) {
        try {
          let vote = await Vote.findById(_id);
          vote["user"] = await User.findById({ _id: vote.user_id });
          vote["issue"] = await Issue.findById({ _id: vote.issue_id });
          return vote;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No Token");
      }
    },
  },

  Mutation: {
    // USERS
    async createUser(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let user = new User({ ...args });
          let newUser = await user.save();
          return newUser;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    async updateUser(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let { _id, username } = args;
          let res = await User.findById(_id);
          if (username) {
            res["username"] = username;
          }
          let updatedUser = await res.save();
          return updatedUser;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    async deleteUser(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let { _id } = args;
          await User.deleteOne({ _id: _id });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    // ISSUES
    async createIssue(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let issue = new Issue({ ...args });
          let newIssue = await issue.save();
          return newIssue;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    async updateIssue(parent, args, { authenticated }) {
      if (authenticated) {
        console.log("in updateIssue", args);
        try {
          let { _id, title, description } = args;
          let res = await Issue.findById(_id);
          console.log(res);
          if (title && description) {
            res["title"] = title;
            res["description"] = description;
          }
          let updatedIssue = await res.save();
          return updatedIssue;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    async deleteIssue(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let { _id } = args;
          await Issue.deleteOne({ _id: _id });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    // COMMENTS
    async createComment(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let comment = new Comment({ ...args });
          let newComment = await comment.save();
          return newComment;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    async updateComment(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let { _id, description } = args;
          let res = await Comment.findById(_id);
          if (description) {
            res["description"] = description;
          }
          let updatedComment = await res.save();
          return updatedComment;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    async deleteComment(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let { _id } = args;
          await Comment.deleteOne({ _id: _id });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    // VOTES
    async createVote(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let matchingVote = await Vote.findOne({ ...args });
          if (!matchingVote) {
            let vote = new Vote({ ...args });
            let newVote = await vote.save();
            return newVote;
          } else {
            console.log("User already voted on this issue");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    async updateVote(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let { _id, upvoted } = args;
          let res = await Vote.findById(_id);
          if (upvoted !== null) {
            res["upvoted"] = upvoted;
          }
          let updatedVote = await res.save();
          return updatedVote;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },

    async deleteVote(parent, args, { authenticated }) {
      if (authenticated) {
        try {
          let { _id } = args;
          await Vote.deleteOne({ _id: _id });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No token");
      }
    },
  },
};

module.exports = resolvers;
