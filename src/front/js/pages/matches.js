import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";

export const Matches = () => {
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (loggedUser) {
            setCurrentUser(loggedUser);
        }

        const fetchMatches = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/matches/${loggedUser.id}`);
                if (!response.ok) throw new Error("Error al obtener matches");
                const data = await response.json();
                setFriends(data);
            } catch (error) {
                console.error("Error fetching matches:", error);
            }
        };

        const fetchRequests = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/match-requests/${loggedUser.id}`);
                if (!response.ok) throw new Error("Error al obtener solicitudes");
                const data = await response.json();
                setRequests(data);
            } catch (error) {
                console.error("Error fetching match requests:", error);
            }
        };

        if (loggedUser) {
            fetchMatches();
            fetchRequests();
        }
    }, []);

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <Tab.Container defaultActiveKey="friends">
                        {/* Centrar Tabs y aplicar color rojo con Bootstrap */}
                        <Nav variant="tabs" className="justify-content-center border-danger">
                            <Nav.Item>
                                <Nav.Link eventKey="friends" className="text-danger fw-bold">Amigos</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="requests" className="text-danger fw-bold">Solicitudes</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            {/* Contenido de los amigos */}
                            <Tab.Pane eventKey="friends">
                                <div className="card p-4 w-100" style={{ backgroundColor: "#FBECE5" }}>
                                    {friends.length > 0 ? (
                                        friends.map((user, index) => (
                                            <div className="row mb-4" key={index}>
                                                <div className="col-md-4 text-center">
                                                    <img
                                                        src={user.image || "https://archive.org/download/placeholder-image/placeholder-image.jpg"}
                                                        alt="Perfil"
                                                        className="img-fluid rounded-circle"
                                                        style={{ cursor: "pointer", width: "150px", height: "150px", objectFit: "cover" }}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <h3 className="fw-bold">{user.name}</h3>
                                                    <p>{user.description || "No hay descripción disponible"}</p>
                                                    <div className="text-center mt-4">
                                                        <button className="btn btn-dark shadow">Chatear</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center">No tienes amigos aún.</p>
                                    )}
                                </div>
                            </Tab.Pane>

                            {/* Contenido de solicitudes de match */}
                            <Tab.Pane eventKey="requests">
                                <div className="card p-4 w-100" style={{ backgroundColor: "#FBECE5" }}>
                                    {requests.length > 0 ? (
                                        requests.map((user, index) => (
                                            <div className="row mb-4" key={index}>
                                                <div className="col-md-4 text-center">
                                                    <img
                                                        src={user.image || "https://archive.org/download/placeholder-image/placeholder-image.jpg"}
                                                        alt="Perfil"
                                                        className="img-fluid rounded-circle"
                                                        style={{ cursor: "pointer", width: "150px", height: "150px", objectFit: "cover" }}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <h3 className="fw-bold">{user.name}</h3>
                                                    <p>{user.description || "No hay descripción disponible"}</p>
                                                    <div className="text-center mt-4">
                                                        <button className="btn btn-success shadow">Aceptar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center">No tienes solicitudes de amistad.</p>
                                    )}
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </div>
    );
};
