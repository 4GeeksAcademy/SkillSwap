import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from '../../img/logo.png';

const Footer = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '50vh' }}>
           
            <div style={{ flex: '1' }}> 
               
            </div>

           
            <footer style={{
                backgroundColor: 'white',
                padding: '2rem',
                fontFamily: 'Montserrat Alternates, sans-serif',
                marginTop: 'auto', 
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Left Section - Logo and Year */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="Logo" style={{ height: '110px', width: 'auto' }} />
                        <span style={{ fontSize: '14px' }}>2025</span>
                    </div>

                    
                    <div className="d-block d-sm-block d-md-none">
                    
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#footerNav"
                            aria-controls="footerNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>

                   
                    <div className="collapse navbar-collapse" id="footerNav">
                        <nav style={{ display: 'flex', gap: '20px' }}>
                            <a href="/mi-perfil" style={{ textDecoration: 'none', color: 'black' }}>Mi Perfil</a>
                            <a href="/sobre-nosotros" style={{ textDecoration: 'none', color: 'black' }}>Sobre Nosotros</a>
                            <a href="/terminos-y-condiciones" style={{ textDecoration: 'none', color: 'black' }}>Términos y Condiciones</a>
                        </nav>
                    </div>

                  
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <button style={{ backgroundColor: '#CD4631', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                            Download App
                        </button>
                      
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

             
                <hr style={{ margin: '1rem 0', borderColor: '#CD4631' }} />
                <p style={{ textAlign: 'center', fontSize: '12px', margin: 0 }}>All rights reserved</p>
            </footer>
        </div>
    );
};

export default Footer;
