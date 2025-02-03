import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const UserCard = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-3" style={{ backgroundColor: "#FBECE5" }}>
                        <div className="row">
                            <div className="col-md-4 text-center">
                                <div className="profile-image">
                                    <img
                                        src="https://i.pinimg.com/736x/38/89/c1/3889c1a08d0e4cd479007420838dcb79.jpg"
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
                    </div>
                </div>
            </div>
        </div>
         
    );
};
