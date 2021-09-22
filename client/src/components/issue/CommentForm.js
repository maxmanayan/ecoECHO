import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { MdAddBox } from "react-icons/md";
import UpdateMessage from "../UpdateMessage";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../graphQL/mutations/commentMutations";
import { GET_ISSUE_BY_ID } from "../../graphQL/queries/issueQueries";

const CommentForm = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { issue } = props;
  const [comment, setComment] = useState({
    description: "",
    user_id: currentUser._id,
    issue_id: issue._id,
    dateCreated: new Date(),
  });

  const [statusUpdate, setStatusUpdate] = useState({ type: "", message: "" });

  const [createComment] = useMutation(CREATE_COMMENT, {
    update(cache, { data }) {
      const { getIssueByID } = cache.readQuery({
        query: GET_ISSUE_BY_ID,
        variables: { getIssueById: issue._id },
      });
      const comments = getIssueByID.comments;
      cache.writeQuery({
        query: GET_ISSUE_BY_ID,
        variables: { getIssueById: issue._id },
        data: {
          getIssueByID: {
            comments: [...comments, data.createComment],
          },
        },
      });
    },
  });

  // Validation #1 - verifies there are no empty fields in register form
  const noEmptyFields = () => {
    if (
      comment.description &&
      comment.user_id &&
      comment.issue_id &&
      comment.dateCreated
    ) {
      setStatusUpdate({ type: "", message: "" });
      return true;
    } else {
      setStatusUpdate({
        type: "error",
        message: "All fields are required",
      });
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (noEmptyFields()) {
      createComment({
        variables: {
          createCommentDescription: comment.description,
          createCommentUserId: comment.user_id,
          createCommentIssueId: comment.issue_id,
          createCommentDateCreated: comment.dateCreated,
        },
      });

      setStatusUpdate({
        type: "success",
        message: "Comment posted",
      });
      setComment({
        description: "",
        user_id: currentUser._id,
        issue_id: issue._id,
        dateCreated: new Date(),
      });
      setTimeout(() => setStatusUpdate({ type: "", message: "" }), 3000);
    }
  };

  return (
    <div className="comment-form-container">
      {statusUpdate.message && (
        <UpdateMessage
          type={statusUpdate.type}
          message={statusUpdate.message}
        />
      )}
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="form-name">
          <h4>{currentUser.username}</h4>
        </div>
        <div className="input-button-container">
          <div className="form-row">
            <input
              placeholder="Write a comment..."
              value={comment.description}
              onChange={(e) =>
                setComment({ ...comment, description: e.target.value })
              }
            />
          </div>

          <div className="button-row">
            <button type="submit">
              <MdAddBox size={50} className="add-icon" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
