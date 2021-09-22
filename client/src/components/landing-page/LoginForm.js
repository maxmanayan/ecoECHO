import React, { useState, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useHistory } from "react-router-dom";
import UpdateMessage from "../UpdateMessage";

const LoginForm = () => {
  const { handleLogin } = useContext(AuthContext);
  const history = useHistory();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [statusUpdate, setStatusUpdate] = useState({ type: "", message: "" });

  // Validation #1 - verifies there are no empty fields in login form
  const noEmptyFields = () => {
    if (loginInfo.email && loginInfo.password) {
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

  // Validation #2 - verifies the email format is valid
  const validateEmail = () => {
    const validationRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (validationRegex.test(String(loginInfo.email).toLowerCase())) {
      setStatusUpdate({ type: "", message: "" });
      return true;
    } else {
      setStatusUpdate({
        type: "error",
        message: "Invalid Email (format should resemble john.doe@example.com)",
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (noEmptyFields() && validateEmail()) {
      let res = await handleLogin(loginInfo, history);
      if (res.hasOwnProperty("error")) {
        setStatusUpdate({
          type: "error",
          message: res.error.message,
        });
      } else {
        setStatusUpdate({
          type: "success",
          message: "Login successful",
        });
      }
    }
  };

  return (
    <div className="login-form-container">
      <h1>Login</h1>
      {statusUpdate.message && (
        <UpdateMessage
          type={statusUpdate.type}
          message={statusUpdate.message}
        />
      )}
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            placeholder="Email"
            value={loginInfo.email}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
          />
        </div>
        <div className="form-row">
          <input
            type="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
          />
        </div>
        <div className="form-button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
