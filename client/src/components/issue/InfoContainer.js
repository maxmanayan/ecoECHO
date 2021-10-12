import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";

const InfoContainer = (props) => {
  const { currentUser } = useContext(AuthContext);
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
      <div className="icon-container">
        {currentUser._id === issue.user_id && (
          <FaEdit size={30} className="edit-icon" />
        )}
      </div>
    </div>
  );
};

export default InfoContainer;
