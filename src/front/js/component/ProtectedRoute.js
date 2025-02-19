import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ProtectedRoute = ({ children }) => {
  const { store } = useContext(Context);

  if (store.auth.isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login?redirect=true" />;
  }
};
