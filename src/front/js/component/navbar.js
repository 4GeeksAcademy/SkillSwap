import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/navbar.css";

const Navbar = () => {
    return (
        <nav>
            <div>
                <Link to="/mi-perfil">Mi Perfil</Link>
                <Link to="/sobre-nosotros">Sobre Nosotros</Link>
                <Link to="/pricing">Nuestros planes</Link>
                <Link to="/mas">Más</Link>
            </div>
            <div>
                <Link to="/login">
                    <button>Log-In</button>
                </Link>
                <Link to="/registrate">
                    <button>Registrate</button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;