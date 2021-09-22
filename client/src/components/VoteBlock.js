import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { CREATE_VOTE, EDIT_VOTE } from "../graphQL/mutations/voteMutations";
import { AuthContext } from "../providers/AuthProvider";
import { GET_ISSUE_BY_ID } from "../graphQL/queries/issueQueries";

const VoteBlock = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { size, count, issue, existingVote } = props;

  const existingVoteStyle = {
    color: "#f0a04b",
    backgroundColor: "#f0a04b28",
    borderRadius: "100%",
  };

  const [updateVote] = useMutation(EDIT_VOTE);

  const [createVote] = useMutation(CREATE_VOTE, {
    update(cache, { data }) {
      const { getIssueByID } = cache.readQuery({
        query: GET_ISSUE_BY_ID,
        variables: { getIssueById: issue._id },
      });
      const votes = getIssueByID.votes;
      cache.writeQuery({
        query: GET_ISSUE_BY_ID,
        variables: { getIssueById: issue._id },
        data: {
          getIssueByID: {
            votes: [...votes, data.createVote],
          },
        },
      });
    },
  });

  const upVote = () => {
    if (existingVote) {
      if (!existingVote.upvoted) {
        updateVote({
          variables: {
            updateVoteId: existingVote._id,
            updateVoteUpvoted: true,
          },
        });
      } else {
        console.log("Can only vote once per issue");
      }
    } else {
      createVote({
        variables: {
          createVoteUpvoted: true,
          createVoteUserId: currentUser._id,
          createVoteIssueId: issue._id,
        },
      });
    }
  };

  const downVote = () => {
    if (existingVote) {
      if (existingVote.upvoted) {
        updateVote({
          variables: {
            updateVoteId: existingVote._id,
            updateVoteUpvoted: false,
          },
        });
      } else {
        console.log("Can only vote once per issue");
      }
    } else {
      createVote({
        variables: {
          createVoteUpvoted: false,
          createVoteUserId: currentUser._id,
          createVoteIssueId: issue._id,
        },
      });
    }
  };

  return (
    <div className="vote-block">
      <MdKeyboardArrowUp
        size={size}
        className="vote-icon"
        onClick={upVote}
        style={existingVote && existingVote.upvoted ? existingVoteStyle : {}}
      />
      <p className="vote-number">{count}</p>
      <MdKeyboardArrowDown
        size={size}
        className="vote-icon"
        onClick={downVote}
        style={existingVote && !existingVote.upvoted ? existingVoteStyle : {}}
      />
    </div>
  );
};

export default VoteBlock;
