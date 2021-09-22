import axios from "axios";
import React, { useState } from "react";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  // constants
  let authToken = localStorage.getItem("authToken");
  let authUserId = localStorage.getItem("userId");
  const [currentUser, setCurrentUser] = useState(null);

  const handleRegister = async (registerInfo, loginInfo, history) => {
    let res;
    try {
      let registration = await axios.post(`/auth/register`, {
        ...registerInfo,
      });
      handleLogin(loginInfo, history);
      res = registration.data;
    } catch (error) {
      console.log(error);
      res = error.response.data;
    } finally {
      return res;
    }
  };

  const handleLogin = async (loginInfo, history) => {
    let res;
    try {
      let login = await axios.post(`/auth/login`, { ...loginInfo });
      localStorage.setItem("authToken", login.data.token);
      localStorage.setItem("userId", login.data.user._id);
      res = login.data;
      history.push("/home");
      window.location.reload();
    } catch (error) {
      console.log(error);
      res = error.response.data;
    } finally {
      return res;
    }
  };

  const handleLogout = async (history) => {
    try {
      await localStorage.removeItem("authToken");
      await localStorage.removeItem("userId");
      setCurrentUser(null);
      history.push("/");
      return { type: "success", message: "Logout successful" };
    } catch (error) {
      console.log(error);
      return { type: "error", message: "Logout failed" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authToken,
        authUserId,
        loggedIn: currentUser !== null,
        handleRegister,
        handleLogin,
        handleLogout,
        setCurrentUser: (user) => setCurrentUser(user),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
