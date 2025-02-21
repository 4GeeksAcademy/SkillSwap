import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignUp = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await actions.signup(name, last_name, email, password);
    if (data) {
      navigate("/");
    } else {
      setError("Error al registrarse");
    }
  };

  return (
    <div className="login-background">
      <div className="text-center mb-4" style={{ marginTop: "2rem" }}>
        <h1>Regístrate</h1>
        <h3 className="text-secondary">
          Crea una cuenta y empieza a disfrutar de Skill & Swap
        </h3>
        <hr style={{ width: "100%", margin: "0 auto", borderColor: "black" }} />
      </div>
      <form onSubmit={handleSubmit} className="container">
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <div className="mb-3">
          <label htmlFor="name" className="form-label label">
            Nombre *
          </label>
          <input
            type="text"
            className="form-control input"
            id="nombre"
            placeholder="Nombre"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label label">
            Apellidos *
          </label>
          <input
            type="text"
            className="form-control input"
            id="apellidos"
            placeholder="Apellidos"
            required
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label label">
            Email *
          </label>
          <input
            type="email"
            className="form-control input"
            id="email"
            placeholder="johndoe@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label label">
            Contraseña *
          </label>
          <input
            type="password"
            className="form-control input"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn button"
          disabled={!name || !last_name || !email || !password}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};
