import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import { LogoutButton } from "./LogoutButton";
import logo from '../../img/logo.png'; 

const Navbar = () => {
  const { store } = useContext(Context);

  return (
    <nav>
      <div className="navbar-logo">
        <Link to="/">
        <img src={logo} alt="Logo" /> 
        </Link>
      </div>
      <div>
        <Link to="/feed">Feed</Link>
        {store.auth.isAuthenticated && <Link to="/my-account">Mi Perfil</Link>}
        {store.auth.isAuthenticated && <Link to="/matches">Matches</Link>}
        <Link to="/about">Sobre Nosotros</Link>
        <Link to="/pricing">Nuestros planes</Link>
      </div>
      <div>
        {!store.auth.isAuthenticated ? (
          <>
            <Link to="/login">
              <button>Log-In</button>
            </Link>
            <Link to="/signup">
              <button>Registrate</button>
            </Link>
          </>
        ) : (
          <LogoutButton />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
