import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/logout`, {
        method: "POST",
        credentials: "include" // Importante para enviar/recibir cookies
      });
      if (response.ok) {
        // Actualiza el estado de autenticación en el store
        actions.logout();
        // Redirige al usuario a la página de login o inicio
        navigate("/login");
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error en el logout:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-secondary">
      Logout
    </button>
  );
};
