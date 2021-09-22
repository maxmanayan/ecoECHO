import React from "react";

const UpdateMessage = (props) => {
  const { type, message } = props;
  return (
    <div className={`${type}-message`}>
      <h4>{message}</h4>
    </div>
  );
};

export default UpdateMessage;
