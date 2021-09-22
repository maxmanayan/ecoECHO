import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation (
    $createCommentDescription: String!
    $createCommentUserId: ID!
    $createCommentIssueId: ID!
    $createCommentDateCreated: String!
  ) {
    createComment(
      description: $createCommentDescription
      user_id: $createCommentUserId
      issue_id: $createCommentIssueId
      dateCreated: $createCommentDateCreated
    ) {
      _id
      description
      user_id
      issue_id
      dateCreated
    }
  }
`;
