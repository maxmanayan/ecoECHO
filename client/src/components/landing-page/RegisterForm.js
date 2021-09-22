import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useHistory } from "react-router";
import UpdateMessage from "../UpdateMessage";

const RegisterForm = () => {
  const { handleRegister } = useContext(AuthContext);
  const history = useHistory();
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    dateCreated: new Date(),
  });

  const [statusUpdate, setStatusUpdate] = useState({ type: "", message: "" });

  // Validation #1 - verifies there are no empty fields in register form
  const noEmptyFields = () => {
    if (
      registerInfo.username &&
      registerInfo.email &&
      registerInfo.password &&
      registerInfo.passwordConfirmation
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

  // Validation #2 - verifies the email format is valid
  const validateEmail = () => {
    const validationRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (validationRegex.test(String(registerInfo.email).toLowerCase())) {
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

  // Validation #3 - verifies the password and passwordConfirmation match
  const verifyPasswordConfirmation = () => {
    if (registerInfo.password === registerInfo.passwordConfirmation) {
      setStatusUpdate({ type: "", message: "" });
      return true;
    } else {
      setStatusUpdate({
        type: "error",
        message: "Password and confirmation do not match",
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (noEmptyFields() && validateEmail() && verifyPasswordConfirmation()) {
      // All frontend validations passed
      const loginInfo = {
        email: registerInfo.email,
        password: registerInfo.password,
      };
      let res = await handleRegister(registerInfo, loginInfo, history);
      if (res.hasOwnProperty("error")) {
        setStatusUpdate({
          type: "error",
          message: res.error.message,
        });
      } else {
        setStatusUpdate({
          type: "success",
          message: "User successfully registered",
        });
      }
    }
  };

  return (
    <div className="register-form-container">
      <h1>Register</h1>
      {statusUpdate.message && (
        <UpdateMessage
          type={statusUpdate.type}
          message={statusUpdate.message}
        />
      )}
      <form id="register-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            placeholder="Username"
            value={registerInfo.username}
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, username: e.target.value })
            }
          />
        </div>
        <div className="form-row">
          <input
            placeholder="Email"
            value={registerInfo.email}
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, email: e.target.value })
            }
          />
        </div>
        <div className="form-row">
          <input
            type="password"
            placeholder="Password"
            value={registerInfo.password}
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, password: e.target.value })
            }
          />
        </div>
        <div className="form-row">
          <input
            type="password"
            placeholder="Confirm Password"
            value={registerInfo.passwordConfirmation}
            onChange={(e) =>
              setRegisterInfo({
                ...registerInfo,
                passwordConfirmation: e.target.value,
              })
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

export default RegisterForm;
