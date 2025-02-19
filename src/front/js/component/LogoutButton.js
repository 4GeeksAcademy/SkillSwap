import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    actions.logout();
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="btn btn-secondary">
      Logout
    </button>
  );
};
