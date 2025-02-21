import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { LogoutButton } from "./LogoutButton";
import logo from '../../img/logo.png'; 

const Navbar = () => {
  const { store } = useContext(Context);

  return (
   
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'white', padding: '0.2rem', borderBottom: '1px solid black' }}>
      <div className="container-fluid">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img 
              src={logo} 
              alt="Logo" 
              className="navbar-brand" 
              style={{ height: '110px', width: 'auto' }} 
            />
          </Link>
        </div>

        {/* Botón hamburguesa para pantallas pequeñas */}
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú colapsable */}
        <div className="collapse navbar-collapse text-dark" id="navbarNav">
          <ul className="navbar-nav m-auto ">
            <li className="nav-item">
              <Link to="/feed" className="nav-link" style={{ fontWeight: 'bold' }}>
                Feed
              </Link>
            </li>
            {store.auth.isAuthenticated && (
              <li className="nav-item">
                <Link to="/my-account" className="nav-link" style={{ fontWeight: 'bold' }}>
                  Mi Perfil
                </Link>
              </li>
            )}
            {store.auth.isAuthenticated && (
              <li className="nav-item">
                <Link to="/matches" className="nav-link" style={{ fontWeight: 'bold' }}>
                  Matches
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/about" className="nav-link" style={{ fontWeight: 'bold' }}>
                Sobre Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pricing" className="nav-link" style={{ fontWeight: 'bold' }}>
                Nuestros planes
              </Link>
            </li>
          </ul>

          {/* Botones de Login y Registro */}
          <div className="d-flex">
            {!store.auth.isAuthenticated ? (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2" style={{ fontWeight: 'bold', transition: 'background-color 0.3s ease' }}>
                  Log-In
                </Link>
                <Link to="/signup" className="btn btn-primary" style={{ fontWeight: 'bold', transition: 'background-color 0.3s ease' }}>
                  Registrate
                </Link>
              </>
            ) : (
              <LogoutButton />
            )}
          </div>
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;
