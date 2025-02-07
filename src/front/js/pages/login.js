import React, { useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { Context } from "../store/appContext"; 
import "../../styles/login.css"; 

const Login = () => { 
    const navigate = useNavigate(); 
    const { actions } = useContext(Context); 
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actions.login(username, password);
            navigate("/private");
        } catch (error) {
            console.error("Error logging in");
        }
    };

    return (
        <div className="login-background">
            <div className="text-center mb-4" style={{ marginTop: '2rem' }}>
                <h1>Inicia Sesion</h1>
                <hr style={{ width: '100%', margin: '0 auto', borderColor: 'black' }} />
            </div>
            <form onSubmit={handleSubmit} className="container">
                <div className="mb-3">
                    <label className="form-label label">Username</label>
                    <input
                        type="text"
                        className="form-control input"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label label">Password</label>
                    <input
                        type="password"
                        className="form-control input"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn button">
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;