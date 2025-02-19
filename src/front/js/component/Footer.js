import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from '../../img/logo.png'; 

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'white', padding: '2rem', fontFamily: 'Montserrat Alternates, sans-serif', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Left Section - Logo and Year */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                   <img src={logo} alt="Logo" style={{ height: '110px', width: 'auto' }}/> 
                    <span style={{ fontSize: '14px' }}>2025</span>
                </div>

                {/* Middle Section - Navbar Items */}
                <nav style={{ display: 'flex', gap: '20px' }}>
                    <a href="/mi-perfil" style={{ textDecoration: 'none', color: 'black' }}>Mi Perfil</a>
                    <a href="/sobre-nosotros" style={{ textDecoration: 'none', color: 'black' }}>Sobre Nosotros</a>
                    <a href="/terminos-y-condiciones" style={{ textDecoration: 'none', color: 'black' }}>Términos y Condiciones</a>
                </nav>

                {/* Right Section - Download App CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <button style={{ backgroundColor: '#CD4631', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '20px' }}>Download App</button>
                    {/* Social Icons Below the CTA */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} style={{ color: 'black' }} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} style={{ color: 'black' }} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} style={{ color: 'black' }} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Line */}
            <hr style={{ margin: '1rem 0', borderColor: '#CD4631' }} />
            <p style={{ textAlign: 'center', fontSize: '12px', margin: 0 }}>All rights reserved</p>
        </footer>
    );
};

export default Footer;