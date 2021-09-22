import React from "react";

const SortOption = (props) => {
  const { setSortBy } = props;
  return (
    <select onChange={(e) => setSortBy(e.target.value)}>
      <option default>Upvotes</option>
      <option>Comments</option>
    </select>
  );
};

export default SortOption;
