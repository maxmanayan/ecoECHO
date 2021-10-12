import React, { useContext, useEffect, useState } from "react";
import VoteBlock from "../VoteBlock";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@apollo/client";
import { GET_ISSUE_BY_ID } from "../../graphQL/queries/issueQueries";

const IssueCard = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { issue: propsIssue, onWall } = props;

  const [issue, setIssue] = useState(null);

  const { data } = useQuery(GET_ISSUE_BY_ID, {
    variables: { getIssueById: propsIssue._id },
  });

  useEffect(() => {
    if (data) {
      setIssue(data.getIssueByID);
    }
  }, [data]);

  const calculateVotes = () => {
    let upVotes = 0;
    let downVotes = 0;
    issue.votes.map((vote) => {
      if (vote.upvoted === true) {
        upVotes += 1;
      } else {
        downVotes += 1;
      }
      return vote;
    });
    return upVotes - downVotes;
  };

  const checkExistingVote = () => {
    let existingVote = null;
    if (issue.votes.length > 0) {
      issue.votes.map((vote) => {
        if (vote.user_id === currentUser._id && vote.issue_id === issue._id) {
          existingVote = vote;
        }
        return vote;
      });
    }
    return existingVote;
  };

  const renderVoteBlock = () => {
    let voteCount = calculateVotes();
    let existingVote = checkExistingVote();
    return (
      <VoteBlock
        size={30}
        count={voteCount}
        issue={issue}
        existingVote={existingVote}
        renderVoteBlock={renderVoteBlock}
      />
    );
  };

  return (
    <>
      {currentUser && issue && (
        <div className="issue-card">
          <Link className="issue-link" to={`/issue/${issue._id}`}>
            <div className="text-container">
              <h3>{issue.title}</h3>
              <h4>by: {issue.user.username}</h4>
              <h4>Comments: {issue.comments.length}</h4>
            </div>
          </Link>
          {renderVoteBlock()}
        </div>
      )}
    </>
  );
};

export default IssueCard;
