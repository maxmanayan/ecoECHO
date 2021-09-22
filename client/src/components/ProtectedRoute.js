import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphQL/queries/userQueries";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authUserId = localStorage.getItem("userId");
  const { setCurrentUser } = useContext(AuthContext);

  // Setting Current User
  const { data } = useQuery(GET_USER, {
    variables: { getUserById: authUserId },
  });

  useEffect(() => {
    if (data) {
      setCurrentUser(data.getUserByID);
    }
  }, [data]);

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          authUserId ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    </>
  );
};

export default ProtectedRoute;
