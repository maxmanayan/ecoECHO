import { gql } from "@apollo/client";

export const CREATE_ISSUE = gql`
  mutation (
    $createIssueTitle: String!
    $createIssueDescription: String!
    $createIssueUserId: ID!
    $createIssueDateCreated: String!
  ) {
    createIssue(
      title: $createIssueTitle
      description: $createIssueDescription
      user_id: $createIssueUserId
      dateCreated: $createIssueDateCreated
    ) {
      _id
      title
      description
    }
  }
`;
