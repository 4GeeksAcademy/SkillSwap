import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const SignUp = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container mt-5">
            <div className="text-center mt-5">
            <h1>Regístrate</h1>
            <h3 className="text-secondary">Crea una cuenta y empieza a disfrutar de Skill & Swap</h3>
            <div className="m-5">
            <form className="m-5">
            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control border-danger" id="nombre" placeholder="Aaron" required/>
                </div>
                <div className="col">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input type="text" className="form-control border-danger" id="apellidos" placeholder="Barcos Caballero" required/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input type="email" className="form-control" id="email" placeholder="johndoe@gmail.com" required/>
                </div>
                <div className="col">
                    <label htmlFor="password" className="form-label">Contraseña *</label>
                    <input type="password" className="form-control" id="password" placeholder="****" required/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="aprender" className="form-label">¿Qué buscas aprender? *</label>
                    <select id="aprender" className="form-select">
                        <option selected disabled>Selecciona una opción</option>
                        <option value="programacion">Programación</option>
                        <option value="idiomas">Idiomas</option>
                        <option value="musica">Música</option>
                        <option value="arte">Arte</option>
                        <option value="cocina">Cocina</option>
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="enseñar" className="form-label">¿Qué puedes enseñar? *</label>
                    <select id="enseñar" className="form-select">
                        <option selected disabled>Selecciona una opción</option>
                        <option value="programacion">Programación</option>
                        <option value="idiomas">Idiomas</option>
                        <option value="musica">Música</option>
                        <option value="arte">Arte</option>
                        <option value="cocina">Cocina</option>
                    </select>
                </div>
            </div>
            <div className="mt-4">
            <Link to="/signup" className="btn btn-danger px-4 py-2">Sign Up</Link>
            </div>
        </form>
        </div>
        </div>
        </div>
    );
};
