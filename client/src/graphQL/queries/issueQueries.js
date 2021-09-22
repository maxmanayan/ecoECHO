import { gql } from "@apollo/client";

export const GET_ISSUES = gql`
  query {
    getAllIssues {
      _id
      title
      description
      dateCreated
      user_id
      user {
        _id
        username
        email
      }
      comments {
        _id
        description
        user_id
        issue_id
      }
      votes {
        _id
        upvoted
        user_id
        issue_id
      }
    }
  }
`;

export const GET_ISSUE_BY_ID = gql`
  query ($getIssueById: ID!) {
    getIssueByID(_id: $getIssueById) {
      _id
      title
      description
      user_id
      dateCreated
      user {
        _id
        username
        email
      }
      comments {
        _id
        description
        user {
          _id
          username
          email
        }
      }
      votes {
        _id
        upvoted
        user_id
        issue_id
      }
    }
  }
`;
