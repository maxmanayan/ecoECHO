import React from "react";
import { useHistory } from "react-router";

const BackButton = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <button className="back-button" onClick={goBack}>
        Back
      </button>
    </div>
  );
};

export default BackButton;
