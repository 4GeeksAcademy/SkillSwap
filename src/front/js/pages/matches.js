import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import { Context } from "../store/appContext";

export const Matches = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);  
    const [requests, setRequests] = useState([]); 

    useEffect(() => {
        if (!store?.auth?.user?.id) return;

        const fetchMatches = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/matches/${store.auth.user.id}`);
                if (!response.ok) throw new Error("Error al obtener matches");
                const data = await response.json();
                setFriends(data);
            } catch (error) {
                console.error("Error fetching matches:", error);
            }
        };

        const fetchRequests = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/match-requests/${store.auth.user.id}`);
                if (!response.ok) throw new Error("Error al obtener solicitudes");
                const data = await response.json();
                setRequests(data);
            } catch (error) {
                console.error("Error fetching match requests:", error);
            }
        };

        fetchMatches();
        fetchRequests();
    }, [store?.auth?.user?.id]);

    const acceptRequest = async (userId) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/match-requests/accept/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ receiver_user_id: store.auth.user.id }),
            });

            if (!response.ok) throw new Error("Error al aceptar la solicitud de match");

            // Actualizar el estado para reflejar el nuevo match
            setFriends([...friends, requests.find(user => user.sender_user.id === userId)]);
            setRequests(requests.filter(user => user.sender_user.id !== userId));

        } catch (error) {
            console.error("Error al aceptar match:", error);
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <Tab.Container defaultActiveKey="friends">
                        <Nav variant="tabs" className="justify-content-center border-danger">
                            <Nav.Item>
                                <Nav.Link eventKey="friends" className="text-danger fw-bold">Amigos</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="requests" className="text-danger fw-bold">Solicitudes</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            {/* Lista de Amigos */}
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
                                                        onClick={() => navigate(`/user/${user.id}`)}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <h3 className="fw-bold">{user.name}</h3>
                                                    <p>{user.description || "No hay descripción disponible"}</p>
                                                    <div className="text-center mt-4">
                                                        <button className="btn btn-dark shadow" onClick={() => navigate("/chat", { state: user })}>
                                                            Chatear
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center">No tienes amigos aún.</p>
                                    )}
                                </div>
                            </Tab.Pane>

                            {/* Lista de Solicitudes */}
                            <Tab.Pane eventKey="requests">
                                <div className="card p-4 w-100" style={{ backgroundColor: "#FBECE5" }}>
                                    {requests.length > 0 ? (
                                        requests.map((request, index) => (
                                            <div className="row mb-4" key={index}>
                                                <div className="col-md-4 text-center">
                                                    <img
                                                        src={request.sender_user.image || "https://archive.org/download/placeholder-image/placeholder-image.jpg"}
                                                        alt="Perfil"
                                                        className="img-fluid rounded-circle"
                                                        style={{ cursor: "pointer", width: "150px", height: "150px", objectFit: "cover" }}
                                                        onClick={() => navigate(`/user/${request.sender_user.id}`)}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <h3 className="fw-bold">{request.sender_user.name}</h3>
                                                    <p>{request.sender_user.description || "No hay descripción disponible"}</p>
                                                    <div className="text-center mt-4">
                                                        <button className="btn btn-success shadow" onClick={() => acceptRequest(request.sender_user.id)}>
                                                            Aceptar
                                                        </button>
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
