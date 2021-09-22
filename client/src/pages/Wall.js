import React, { useContext, useState } from "react";
import EmptyStateIssuesContainer from "../components/empty-states/home&wall/EmptyStateIssuesContainer";
import Header from "../components/home&wall/Header";
import IssueCard from "../components/home&wall/IssueCard";
import IssueForm from "../components/home&wall/IssueForm";
import { AuthContext } from "../providers/AuthProvider";

const Wall = () => {
  const { currentUser } = useContext(AuthContext);
  const [sortBy, setSortBy] = useState("Upvotes");

  const sortByUpVotes = () => {
    const sortedIssues = currentUser.issues.map((issue) => {
      let newIssue = { ...issue, upVoteCount: 0 };
      newIssue.votes.map((vote) => {
        if (vote.upvoted) newIssue.upVoteCount += 1;
        if (!vote.upvoted) newIssue.upVoteCount -= 1;
        return vote;
      });
      return newIssue;
    });
    sortedIssues.sort((a, b) => {
      if (a.upVoteCount > b.upVoteCount) {
        return -1;
      }
      if (a.upVoteCount < b.upVoteCount) {
        return 1;
      }
      return 0;
    });
    return sortedIssues;
  };

  // Sorting issues by most comments to least comments
  const sortByComments = () => {
    const sortedIssues = [...currentUser.issues];
    sortedIssues.sort((a, b) => {
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      return 0;
    });
    return sortedIssues;
  };

  const renderIssueCards = () => {
    let sortedIssues = currentUser.issues;

    if (sortBy === "Upvotes") {
      sortedIssues = sortByUpVotes();
    }

    if (sortBy === "Comments") {
      sortedIssues = sortByComments();
    }

    return sortedIssues.map((issue) => {
      return <IssueCard key={issue._id} issue={issue} />;
    });
  };

  return (
    <>
      {currentUser && (
        <div id="wall">
          <h2>{currentUser.username}'s Wall</h2>

          <div className="page-body">
            <div className="issue-form-container">
              <h1 className="issue-form-header">Create Issue</h1>
              <IssueForm />
            </div>
            {currentUser.issues ? (
              <div className="my-issues-container">
                <Header
                  headerText={"My Issues"}
                  parent={"wall"}
                  setSortBy={setSortBy}
                />
                <div className="issues-container">{renderIssueCards()}</div>
              </div>
            ) : (
              <EmptyStateIssuesContainer />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Wall;
