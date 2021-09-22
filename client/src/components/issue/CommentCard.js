import React from "react";

const CommentCard = (props) => {
  const { comment } = props;

  return (
    <div className="comment-card">
      <h4>{comment.user.username}</h4>
      <p>{comment.description}</p>
    </div>
  );
};

export default CommentCard;
