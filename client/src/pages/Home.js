import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import EmptyStateIssuesContainer from "../components/empty-states/home&wall/EmptyStateIssuesContainer";
import Header from "../components/home&wall/Header";
import IssueCard from "../components/home&wall/IssueCard";
import IssueForm from "../components/home&wall/IssueForm";
import Modal from "../components/Modal";
import UpdateMessage from "../components/UpdateMessage";
import { GET_ISSUES } from "../graphQL/queries/issueQueries";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const [issues, setIssues] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState({ type: "", message: "" });
  const [sortBy, setSortBy] = useState("Upvotes");

  const { data } = useQuery(GET_ISSUES);

  useEffect(() => {
    if (data) {
      setIssues(data.getAllIssues);
    }
  }, [data]);

  // Sorting issues by number of upvotes - number of downvotes
  const sortByUpVotes = () => {
    const sortedIssues = issues.map((issue) => {
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
    const sortedIssues = [...issues];
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
    let sortedIssues = issues;

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

  const openCreateIssueModal = () => {
    setShowModal("createIssue");
  };

  const closeModal = (statusMessage) => {
    setShowModal(null);
    statusMessage && setStatusUpdate(statusMessage);
    setTimeout(() => setStatusUpdate({ type: "", message: "" }), 3000);
  };

  return (
    <>
      {currentUser && (
        <div id="home">
          <Header
            headerText={"Issues"}
            openCreateIssueModal={openCreateIssueModal}
            parent={"home"}
            setSortBy={setSortBy}
          />
          {statusUpdate.message && (
            <UpdateMessage
              type={statusUpdate.type}
              message={statusUpdate.message}
            />
          )}
          {issues ? (
            <div className="issues-container">{renderIssueCards()}</div>
          ) : (
            <EmptyStateIssuesContainer />
          )}

          {showModal === "createIssue" && (
            <Modal>
              <IssueForm isModal={true} closeModal={closeModal} />
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
