import React from "react";
import { MdAddBox } from "react-icons/md";
import SortOption from "./SortOption";

const Header = (props) => {
  const { headerText, openCreateIssueModal, parent, setSortBy } = props;
  return (
    <div className="header">
      <div className="text-icon-container">
        <h1>{headerText}</h1>
        {parent === "home" && (
          <MdAddBox
            size={40}
            className="add-icon"
            onClick={openCreateIssueModal}
          />
        )}
      </div>
      <div className="sort-option">
        <SortOption setSortBy={setSortBy} />
      </div>
    </div>
  );
};

export default Header;
