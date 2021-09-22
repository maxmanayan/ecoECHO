const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # OBJECTS --------------------------------------------------------
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    dateCreated: String!
    issues: [Issue!]
    comments: [Comment!]
    votes: [Vote!]
  }

  type Issue {
    _id: ID!
    title: String!
    description: String!
    user_id: ID!
    dateCreated: String!
    user: User
    comments: [Comment!]
    votes: [Vote!]
  }

  type Comment {
    _id: ID!
    description: String!
    user_id: ID!
    issue_id: ID!
    dateCreated: String!
    user: User
    issue: Issue
  }

  type Vote {
    _id: ID!
    upvoted: Boolean!
    user_id: ID!
    issue_id: ID!
    user: User
    issue: Issue
  }

  # QUERIES --------------------------------------------------------
  type Query {
    # User
    getAllUsers: [User!]
    getUserByID(_id: ID!): User

    # Issue
    getAllIssues: [Issue!]
    getIssueByID(_id: ID!): Issue
    getUserIssues(_id: ID!): [Issue!]

    # Comment
    getAllComments: [Comment!]
    getCommentByID(_id: ID!): Comment
    getIssueComments(_id: ID!): [Comment!]

    # Vote
    getAllVotes: [Vote!]
    getVoteByID(_id: ID!): Vote
  }

  # MUTATIONS --------------------------------------------------------
  type Mutation {
    # User
    createUser(
      username: String!
      email: String!
      password: String!
      dateCreated: String!
    ): User
    updateUser(_id: ID!, username: String!): User
    deleteUser(_id: ID!): ID

    # Issue
    createIssue(
      title: String!
      description: String!
      user_id: ID!
      dateCreated: String!
    ): Issue
    updateIssue(_id: ID!, title: String!, description: String!): Issue
    deleteIssue(_id: ID!): ID

    # Comment
    createComment(
      description: String!
      user_id: ID!
      issue_id: ID!
      dateCreated: String!
    ): Comment
    updateComment(_id: ID!, description: String!): Comment
    deleteComment(_id: ID!): ID

    # Vote
    createVote(upvoted: Boolean!, user_id: ID!, issue_id: ID!): Vote
    updateVote(_id: ID!, upvoted: Boolean!): Vote
    deleteVote(_id: ID!): ID
  }
`;

module.exports = typeDefs;
