import { gql } from "@apollo/client";

export const CREATE_VOTE = gql`
  mutation (
    $createVoteUpvoted: Boolean!
    $createVoteUserId: ID!
    $createVoteIssueId: ID!
  ) {
    createVote(
      upvoted: $createVoteUpvoted
      user_id: $createVoteUserId
      issue_id: $createVoteIssueId
    ) {
      _id
      upvoted
      user_id
      issue_id
    }
  }
`;

export const EDIT_VOTE = gql`
  mutation ($updateVoteId: ID!, $updateVoteUpvoted: Boolean!) {
    updateVote(_id: $updateVoteId, upvoted: $updateVoteUpvoted) {
      _id
      upvoted
      user_id
      issue_id
    }
  }
`;
