import React, { useContext, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { AuthContext } from "../../providers/AuthProvider";
import { useMutation } from "@apollo/client";
import { CREATE_ISSUE } from "../../graphQL/mutations/issueMutations";
import { GET_ISSUES } from "../../graphQL/queries/issueQueries";
import { GET_USER } from "../../graphQL/queries/userQueries";
import UpdateMessage from "../UpdateMessage";

const IssueForm = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { isModal, closeModal, presetIssue } = props;

  const [issue, setIssue] = useState(
    presetIssue
      ? presetIssue
      : {
          title: "",
          description: "",
          user_id: currentUser._id,
          dateCreated: new Date(),
        }
  );

  const [statusUpdate, setStatusUpdate] = useState({ type: "", message: "" });

  const [createIssue] = useMutation(CREATE_ISSUE, {
    update(cache, { data }) {
      if (isModal) {
        const { getAllIssues } = cache.readQuery({
          query: GET_ISSUES,
        });
        cache.writeQuery({
          query: GET_ISSUES,
          data: {
            getAllIssues: [...getAllIssues, data.createIssue],
          },
        });
        return data;
      } else {
        const { getUserByID } = cache.readQuery({
          query: GET_USER,
          variables: { getUserById: currentUser._id },
        });
        const issues = getUserByID.issues;
        cache.writeQuery({
          query: GET_USER,
          variables: { getUserById: currentUser._id },
          data: {
            getUserByID: {
              issues: [...issues, data.createIssue],
            },
          },
        });
      }
    },
  });

  // Validation #1 - verifies there are no empty fields in register form
  const noEmptyFields = () => {
    if (
      issue.title &&
      issue.description &&
      issue.user_id &&
      issue.dateCreated
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

  const handleCreate = () => {
    createIssue({
      variables: {
        createIssueTitle: issue.title,
        createIssueDescription: issue.description,
        createIssueUserId: issue.user_id,
        createIssueDateCreated: issue.dateCreated,
      },
    });
    setStatusUpdate({
      type: "success",
      message: "Issue posted",
    });
  };

  const handleUpdate = () => {
    console.log("edit issue");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noEmptyFields()) {
      presetIssue ? handleUpdate() : handleCreate();
      setIssue({
        title: "",
        description: "",
        user_id: currentUser._id,
        dateCreated: new Date(),
      });
      setTimeout(() => setStatusUpdate({ type: "", message: "" }), 3000);
      isModal &&
        closeModal({
          type: "success",
          message: "Issue posted",
        });
    }
  };

  return (
    <>
      {isModal && (
        <div className="modal-header">
          <h1>{presetIssue ? "Edit Issue" : "Create Issue"}</h1>
          <AiFillCloseCircle
            size={40}
            className="modal-close-icon"
            onClick={closeModal}
          />
        </div>
      )}
      {statusUpdate.message && (
        <UpdateMessage
          type={statusUpdate.type}
          message={statusUpdate.message}
        />
      )}
      <form id="issue-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            placeholder="Title"
            value={issue.title}
            onChange={(e) => setIssue({ ...issue, title: e.target.value })}
          />
        </div>
        <div className="form-row">
          <textarea
            placeholder="Description"
            value={issue.description}
            onChange={(e) =>
              setIssue({ ...issue, description: e.target.value })
            }
          />
        </div>

        <div className="form-row">
          <p>Created By: {currentUser.username}</p>
        </div>
        <div className="button-row">
          <button type="submit">{presetIssue ? "Update" : "Create"}</button>
        </div>
      </form>
    </>
  );
};

export default IssueForm;
