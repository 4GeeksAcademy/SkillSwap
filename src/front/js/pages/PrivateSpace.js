import React from "react";
import { useNavigate } from "react-router-dom";

export const PrivateSpace = () => {
    const navigate = useNavigate();

    const users = [
        {
            name: "Lucia Canalda",
            image: "https://i.pinimg.com/736x/35/d4/a6/35d4a62fad980e8f5a410d3a6bc3f219.jpg",
            tags: ["Aventura", "Healthy"],
            description: "Mi pasión es el surf. Si quieres aprender a surfear yo estoy buscando aprender cocina asiática.",
            date: "Sep 22, 2021"
        },
        {
            name: "Aaron Barcos",
            image: "https://i.pinimg.com/736x/8a/28/49/8a2849a63361dde038c098fa2827d2b4.jpg",
            tags: ["Detallista", "Lectura"],
            description: "Me paso horas leyendo novelas, me encantaría aprender japonés para poder leer mangas.",
            date: "Jan 16, 2023"
        },
        {
            name: "Alejandro Gil",
            image: "https://i.pinimg.com/736x/cf/55/a3/cf55a38599b8bc9d88897970d32b02eb.jpg",
            tags: ["Creativo", "Baile"],
            description: "La música y el baile forman parte de mí, puedo dar clases de baile si alguien me ayuda a introducirme en programación.",
            date: "Dec 20, 2024"
        }
    ];

    const goToUserProfile = (user) => {
        navigate("/usercard", { state: user }); 
    };

    const goToChat = (user) => {
        navigate("/chat", { state: user }); 
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card p-4 w-100" style={{ backgroundColor: "#FBECE5" }}>
                        {users.map((user, index) => (
                            <div className="row mb-4" key={index}>
                                <div className="col-md-4 text-center">
                                    <img
                                        src={user.image}
                                        alt="Perfil"
                                        className="img-fluid rounded-circle"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => goToUserProfile(user)} 
                                    />
                                    <div className="mt-3">
                                        {user.tags.map((tag, i) => (
                                            <span key={i} className="badge bg-secondary me-1">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className="fw-bold" style={{ cursor: "pointer" }} onClick={() => goToUserProfile(user)}>
                                            {user.name}
                                        </h3>
                                        <p>{user.description}</p>
                                        <div className="text-center mt-5">
                                            <p className="text-muted">{user.date}</p>
                                            <button className="btn btn-dark me-3 shadow" onClick={() => goToChat(user)}>Chatear</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
