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

export const UPDATE_ISSUE = gql`
  mutation (
    $updateIssueId: ID!
    $updateIssueTitle: String!
    $updateIssueDescription: String!
  ) {
    updateIssue(
      _id: $updateIssueId
      title: $updateIssueTitle
      description: $updateIssueDescription
    ) {
      _id
      title
      description
      user_id
      dateCreated
    }
  }
`;
