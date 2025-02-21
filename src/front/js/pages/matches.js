import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Tab, Nav } from "react-bootstrap";

export const Matches = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [matchesRequests, setMatchesRequests] = useState([]);
    // Aquí "friends" contendrá la data de matches, donde cada match incluye "other_user"
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (!store?.auth?.user?.id) return;

        const fetchMatchesRequests = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/match-requests/${store.auth.user.id}`);
                if (!response.ok) throw new Error("Error al obtener match requests");
                const data = await response.json();
                console.log("Solicitudes de match recibidas: ", data);
                setMatchesRequests(data);
            } catch (error) {
                console.error("Error fetching match requests:", error);
            }
        };

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

        fetchMatchesRequests();
        fetchMatches();
    }, [store?.auth?.user?.id]);


    
    const acceptMatch = async (userId, requestMatchId) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/match`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_1_id: store.auth.user.id,
                    user_2_id: userId,
                    match_request_id: requestMatchId
                })
            });

            if (!response.ok) throw new Error("Error al aceptar el match");

            // Remover la solicitud aceptada del estado
            setMatchesRequests((prevData) =>
                prevData.filter((data) => data.id !== requestMatchId)
            );
        } catch (error) {
            console.error("Error al aceptar el match:", error);
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <Tab.Container defaultActiveKey="friends">
                        <Nav variant="tabs" className="justify-content-center border-danger">
                            <Nav.Item>
                                <Nav.Link eventKey="friends" className="text-danger fw-bold">
                                    Amigos
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="requests" className="text-danger fw-bold">
                                    Solicitudes
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            {/* Tab Amigos */}
                            <Tab.Pane eventKey="friends">
                                <div className="card p-4 w-100" style={{ backgroundColor: "#FBECE5" }}>
                                    {friends.length > 0 ? (
                                        friends.map((match, index) => {
                                            const friend = match.friend;
                                            return (
                                                <div className="row mb-4" key={index}>
                                                    <div className="col-md-4 text-center">
                                                        <img
                                                            src={
                                                                friend.profile_pic_src ||
                                                                "https://archive.org/download/placeholder-image/placeholder-image.jpg"
                                                            }
                                                            alt="Perfil"
                                                            className="img-fluid rounded-circle"
                                                            style={{
                                                                cursor: "pointer",
                                                                width: "150px",
                                                                height: "150px",
                                                                objectFit: "cover"
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <h3 className="fw-bold">{friend.name} {friend.last_name}</h3>
                                                        <p>{friend.description || "No hay descripción disponible"}</p>
                                                        <div className="text-center mt-4">
                                                        <button
    className="btn btn-dark shadow"
    onClick={() => {
        if (friend.phone_number) {
            const whatsappLink = `https://wa.me/${friend.phone_number}`;
            window.open(whatsappLink, "_blank"); // Abrir en una nueva pestaña
        } else {
            alert("Este usuario no ha proporcionado un número de WhatsApp.");
        }
    }}
>
    Chatear
</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-center">No tienes amigos aún.</p>
                                    )}
                                </div>
                            </Tab.Pane>

                            {/* Tab Solicitudes */}
                            <Tab.Pane eventKey="requests">
                                <div className="card p-4 w-100" style={{ backgroundColor: "#FBECE5" }}>
                                    {matchesRequests.length > 0 ? (
                                        matchesRequests.map((request, index) => (
                                            <div className="row mb-4" key={index}>
                                                <div className="col-md-4 text-center">
                                                    <img
                                                        src={
                                                            request.sender_user?.profile_pic_src ||
                                                            "https://archive.org/download/placeholder-image/placeholder-image.jpg"
                                                        }
                                                        alt="Perfil"
                                                        className="img-fluid rounded-circle"
                                                        style={{
                                                            cursor: "pointer",
                                                            width: "150px",
                                                            height: "150px",
                                                            objectFit: "cover"
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <h3 className="fw-bold">
                                                        {request.sender_user?.name} {request.sender_user?.last_name}
                                                    </h3>
                                                    <p>
                                                        {request.sender_user?.description || "No hay descripción disponible"}
                                                    </p>
                                                    <div className="text-center mt-4">
                                                        <button
                                                            className="btn btn-success shadow"
                                                            onClick={() =>
                                                                acceptMatch(request.sender_user.id, request.id)
                                                            }
                                                        >
                                                            Aceptar
                                                        </button>
                                                        <button className="btn btn-danger shadow ms-2">
                                                            Rechazar
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
