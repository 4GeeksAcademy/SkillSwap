import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import "../../styles/login.css"; 

const Login = () => { 
    const navigate = useNavigate(); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://effective-goldfish-7vrjjp4gjw97fxpxj-3001.app.github.dev/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                // Handle error responses (e.g., 401 Unauthorized)
                throw new Error("Login failed. Please check your email and password.");
            }

            const data = await response.json();
            // Save token or user data as needed
            localStorage.setItem("token", data.token); // Example of saving a token
            navigate("/private");
        } catch (error) {
            console.error("Error logging in:", error);
            setError(error.message); // Set error message to state
        }
    };

    return (
        <div className="login-background">
            <div className="text-center mb-4" style={{ marginTop: '2rem' }}>
                <h1>Inicia Sesion</h1>
                <hr style={{ width: '100%', margin: '0 auto', borderColor: 'black' }} />
            </div>
            <form onSubmit={handleSubmit} className="container">
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
                <div className="mb-3">
                    <label className="form-label label">Email</label>
                    <input
                        type="email"
                        className="form-control input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
