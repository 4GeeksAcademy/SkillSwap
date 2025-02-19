import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";
import { LogoutButton } from "./LogoutButton";

const Navbar = () => {
  const { store } = useContext(Context);

  return (
    <nav>
      <div className="navbar-logo">
        <Link to="/">
          <img src="https://previews.dropbox.com/p/thumb/ACjmNKaFNlOlq8GujX0shm7o9uHqIU5UIfQxaQnf0afQhIkmqENzejMWe4YmLikydZqpcomPh1_kdQL44BrrouGLDXV2jzESI7m2Fihmfy12zxiB0IjXLzY5Uoye7fZOidevV0ZB4KZvvAHp1naLNoZhnSnJf3ueM1th9zrdWo7w1zvzkcK2Mmnrd3n0UdUdajPA-5875ieUcHznBHgR0h48EVtCYN0wLkQ7gU-xB6wz8zLRM4DyDGH6hy_j2vg7HTX9lrRv_TAtpSUzR2b7lisddyLchKp8eGCP5cdq5Anj-3IQCoCgFNONzZgHC6BFfVYP334DbZyUTRGmpK-JtILg/p.png?is_prewarmed=true" alt="Logo" />
        </Link>
      </div>
      <div>
        <Link to="/feed">Feed</Link>
        <Link to="/about">Sobre Nosotros</Link>
        <Link to="/pricing">Nuestros planes</Link>
        <Link to="/mas">Más</Link>
      </div>
      {!store.auth.isAuthenticated ? (
        <div>
          <Link to="/login">
            <button>Log-In</button>
          </Link>
          <Link to="/signup">
            <button>Registrate</button>
          </Link>
        </div>
      ) : (
        <div>
          <LogoutButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
