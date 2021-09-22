import React from "react";

const InfoContainer = (props) => {
  const { issue } = props;

  return (
    <div className="info-container">
      <div className="header">
        <h3>Posted by: {issue.user.username}</h3>
        <h3>Total Votes: {issue.votes.length}</h3>
      </div>
      <div className="title-description-container">
        <h1>{issue.title}</h1>
        <h3>{issue.description}</h3>
      </div>
    </div>
  );
};

export default InfoContainer;
