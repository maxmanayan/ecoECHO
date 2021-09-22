import { gql } from "@apollo/client";

export const GET_USER = gql`
  query ($getUserById: ID!) {
    getUserByID(_id: $getUserById) {
      _id
      username
      email
      password
      dateCreated
      issues {
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
        }
        votes {
          _id
          upvoted
          user_id
          issue_id
        }
      }
      comments {
        _id
        issue_id
        description
      }
      votes {
        _id
        upvoted
      }
    }
  }
`;
