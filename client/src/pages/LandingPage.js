import React, { useState } from "react";
import LoginForm from "../components/landing-page/LoginForm";
import RegisterForm from "../components/landing-page/RegisterForm";
import { FaTree } from "react-icons/fa";

const LandingPage = () => {
  const [formView, setFormView] = useState("login");

  const switchFormView = (view) => {
    setFormView(view);
  };
  return (
    <div id="landing-page">
      <div className="form-container">
        <div className="button-container">
          <button
            onClick={() => switchFormView("login")}
            style={{ backgroundColor: formView === "login" ? "#183a1db6" : "" }}
          >
            Login
          </button>
          <button
            onClick={() => switchFormView("register")}
            style={{
              backgroundColor: formView === "register" ? "#183a1db6" : "",
            }}
          >
            Register
          </button>
        </div>
        {formView === "login" && <LoginForm />}
        {formView === "register" && <RegisterForm />}
      </div>
      <div className="logo-container">
        <FaTree size={300} />
        <h1>ecoECHO</h1>
      </div>
    </div>
  );
};

export default LandingPage;
