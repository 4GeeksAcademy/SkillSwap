import React from 'react';


const Home = () => {
    return (
        <div style={{ backgroundColor: '#F7EDE8', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontFamily: 'Montserrat Alternates' }}>
            <h1 style={{ 
                color: 'black', 
                fontWeight: 'bold', 
                fontSize: '96px', 
                lineHeight: '100%', 
                letterSpacing: '-4%', 
                marginBottom: '2rem' 
            }}>
                Welcome to Our Service
            </h1>
            <input 
                type="text" 
                placeholder="Search..." 
                style={{ 
                    width: '400px', 
                    padding: '1rem', 
                    borderRadius: '20px', 
                    border: '1px solid #CD4631', 
                    fontSize: '16px', 
                    marginBottom: '2rem' 
                }} 
            />
            <button style={{ 
                backgroundColor: '#CD4631', 
                color: 'white', 
                border: 'none', 
                padding: '0.5rem 1.5rem', 
                borderRadius: '20px', 
                fontSize: '16px' 
            }}>
                Search
            </button>
        </div>
    );
};

export default Home;