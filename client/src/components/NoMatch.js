import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div id="no-match">
      <h2>The page you are looking for does not exist!</h2>
      <div className="return-home">
        <h2>Return</h2>
        <Link to="/home" className="link">
          <h2>Home</h2>
        </Link>
      </div>
    </div>
  );
};

export default NoMatch;
