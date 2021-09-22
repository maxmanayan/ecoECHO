import React from "react";

const Modal = (props) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">{props.children}</div>
    </div>
  );
};

export default Modal;
