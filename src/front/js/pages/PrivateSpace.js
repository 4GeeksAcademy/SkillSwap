import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const PrivateSpace = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-3" style={{ backgroundColor: "#FBECE5" }}>
                        <div className="row m-5">
                            <div className="col-md-4 text-center">
                                <div className="profile-image">
                                    <img
                                        src="https://i.pinimg.com/736x/35/d4/a6/35d4a62fad980e8f5a410d3a6bc3f219.jpg"
                                        alt="Perfil"
                                        className="img-fluid rounded-circle"
                                    />
                                     <div className="mt-3">
                                        <span className="badge bg-secondary">Aventura</span>{" "}
                                        <span className="badge bg-secondary">Healthy</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div className="card-body">
                                    <h3 className="fw-bold">Lucia Canalda</h3>
                                    <p>
                                        Mi pasión es el surf. Si quieres aprender a surfear yo estoy
                                        buscando aprender cocina asiática.
                                    </p>
                                    <div className="text-center mt-5">
                                    <p className="text-muted">Sep 22, 2021</p>
                                    <div className="">
                                        <button className="btn btn-dark me-3 shadow">Chatear</button>
                                        <button className="btn btn-outline-dark shadow">Solicitud de amistad</button>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <div className="row m-5">
                            <div className="col-md-4 text-center">
                                <div className="profile-image">
                                    <img
                                        src="https://i.pinimg.com/736x/8a/28/49/8a2849a63361dde038c098fa2827d2b4.jpg"
                                        alt="Perfil"
                                        className="img-fluid rounded-circle"
                                    />
                                     <div className="mt-3">
                                        <span className="badge bg-secondary">Detallista</span>{" "}
                                        <span className="badge bg-secondary">Lectura</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div className="card-body">
                                    <h3 className="fw-bold">Aaron Barcos</h3>
                                    <p>
                                    Me paso horas leyendo novelas, me encantaría aprender japonés para poder leer mangas.
                                    Si estas interesado puedo enseñar a hacer calistenia
                                    </p>
                                    <div className="text-center mt-5">
                                    <p className="text-muted">Jan 16, 2023</p>
                                    <div className="">
                                        <button className="btn btn-dark me-3 shadow">Chatear</button>
                                        <button className="btn btn-outline-dark shadow">Solicitud de amistad</button>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <div className="row m-5">
                            <div className="col-md-4 text-center">
                                <div className="profile-image">
                                    <img
                                        src="https://i.pinimg.com/736x/cf/55/a3/cf55a38599b8bc9d88897970d32b02eb.jpg"
                                        alt="Perfil"
                                        className="img-fluid rounded-circle"
                                    />
                                     <div className="mt-3">
                                        <span className="badge bg-secondary">Creativo</span>{" "}
                                        <span className="badge bg-secondary">Baile</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div className="card-body">
                                    <h3 className="fw-bold">Alejandro Gil</h3>
                                    <p>
                                        La musica y el baile forman parte de mi, puedo dar clases de baile si alguien me ayuda a introducirme en el mundo de la programación.
                                    </p>
                                    <div className="text-center mt-5">
                                    <p className="text-muted">Dec 20, 2024</p>
                                    <div className="">
                                        <button className="btn btn-dark me-3 shadow">Chatear</button>
                                        <button className="btn btn-outline-dark shadow">Solicitud de amistad</button>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         
    );
};