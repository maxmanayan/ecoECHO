import React, { useContext, useState } from "react";
import { FaTree } from "react-icons/fa";
import { useHistory } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import UpdateMessage from "./UpdateMessage";

const Navbar = () => {
  const { handleLogout, currentUser } = useContext(AuthContext);
  const history = useHistory();
  const [statusUpdate, setStatusUpdate] = useState({ type: "", message: "" });

  const displayLogoutStatusUpdate = (res) => {
    setStatusUpdate(res);
    setTimeout(() => setStatusUpdate({ type: "", message: "" }), 3000);
  };

  const logOutClicked = async () => {
    let res = await handleLogout(history);
    displayLogoutStatusUpdate(res);
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <Link className="home-link" to="/home">
          <FaTree size={50} />
          <h2>ecoECHO</h2>
        </Link>
      </div>

      <div className="nav-right">
        {currentUser && (
          <>
            <Link className="wall-link" to={`/wall/${currentUser._id}`}>
              <h3>Wall</h3>
            </Link>
            <button id="logout-button" onClick={logOutClicked}>
              Logout
            </button>
          </>
        )}
        {statusUpdate.message && (
          <UpdateMessage
            type={statusUpdate.type}
            message={statusUpdate.message}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
