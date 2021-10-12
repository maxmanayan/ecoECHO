import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import CommentCard from "../components/issue/CommentCard";
import CommentForm from "../components/issue/CommentForm";
import InfoContainer from "../components/issue/InfoContainer";
import VoteBlock from "../components/VoteBlock";
import { GET_ISSUE_BY_ID } from "../graphQL/queries/issueQueries";
import { AuthContext } from "../providers/AuthProvider";
import { FaEdit } from "react-icons/fa";

const Issue = () => {
  const { currentUser } = useContext(AuthContext);
  const { _id } = useParams();

  const [issue, setIssue] = useState(null);

  const { data } = useQuery(GET_ISSUE_BY_ID, {
    variables: { getIssueById: _id },
  });

  useEffect(() => {
    if (data) {
      setIssue(data.getIssueByID);
    }
  }, [data]);

  const renderComments = () => {
    return issue.comments.map((comment) => {
      return <CommentCard key={comment._id} comment={comment} />;
    });
  };

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
    console.log(currentUser._id);
    let voteCount = calculateVotes();
    let existingVote = checkExistingVote();
    return (
      <VoteBlock
        size={80}
        count={voteCount}
        issue={issue}
        existingVote={existingVote}
        renderVoteBlock={renderVoteBlock}
      />
    );
  };

  return (
    <>
      {currentUser && (
        <div id="issue-view">
          {issue && (
            <>
              <header>
                <BackButton />
                <h1>Issue</h1>
                {currentUser._id === issue.user_id ? <FaEdit /> : <div></div>}
              </header>
              <div className="info-block">
                <InfoContainer issue={issue} />
                {renderVoteBlock()}
              </div>
              <div className="comment-container">
                <h1>Comments</h1>
                <CommentForm issue={issue} />
                {issue.comments.length > 0 ? (
                  renderComments()
                ) : (
                  <h3>No Comments Yet... Create One!</h3>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Issue;
