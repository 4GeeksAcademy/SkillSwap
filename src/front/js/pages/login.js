import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await actions.login(email, password);
    if (data) {
      navigate("/");
    }
  };

  return (
    <div className="login-background">
      <div className="text-center mb-4" style={{ marginTop: "2rem" }}>
        <h1>Inicia Sesión</h1>
        <hr style={{ width: "100%", margin: "0 auto", borderColor: "black" }} />
      </div>
      <form onSubmit={handleSubmit} className="container">
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
        <button
          type="submit"
          className="btn button"
          disabled={!email || !password}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
