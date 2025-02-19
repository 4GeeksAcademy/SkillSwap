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
    <div className="container-fluid mt-5">
      <div className="text-center mt-5">
        <h1>Regístrate</h1>
        <h3 className="text-secondary">
          Crea una cuenta y empieza a disfrutar de Skill & Swap
        </h3>
        <div className="m-5">
          <form onSubmit={handleSubmit} className="m-5">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control border-danger" id="nombre" placeholder="Aaron" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col">
                    <label htmlFor="last_name" className="form-label">Apellidos</label>
                    <input type="text" className="form-control border-danger" id="apellidos" placeholder="Barcos Caballero" required value={last_name} onChange={(e) => setLastname(e.target.value)} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input type="email" className="form-control" id="email" placeholder="johndoe@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col">
                    <label htmlFor="password" className="form-label">Contraseña *</label>
                    <input type="password" className="form-control" id="password" placeholder="****" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <button type="submit" className="btn btn-danger">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
