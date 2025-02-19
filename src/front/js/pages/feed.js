import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Feed = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); // Usuario logueado

    useEffect(() => {
        // Obtener el usuario autenticado desde localStorage (puede cambiarse si usas contexto global)
        const loggedUser = JSON.parse(localStorage.getItem("currentUser")); 
        if (loggedUser) {
            setCurrentUser(loggedUser);
        }

        const fetchUsersWithSkills = async () => {
            try {
                const response = await fetch("https://shiny-tribble-v6gjwv44p9r43rp6-3001.app.github.dev/api/users");
                if (!response.ok) {
                    throw new Error("Error al obtener usuarios");
                }
                let data = await response.json();

                // Filtrar usuarios para excluir el usuario logueado
                if (loggedUser) {
                    data = data.filter(user => user.id !== loggedUser.id);
                }

                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsersWithSkills();
    }, []);

    const goToUserProfile = (user) => {
        navigate(`/user/${user.id}`);
    };

    const goToChat = (user) => {
        navigate("/chat", { state: user });
    };

    const handleMatch = async (userId) => {
        try {
            const response = await fetch(`https://shiny-tribble-v6gjwv44p9r43rp6-3001.app.github.dev/api/match/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requesterId: currentUser.id }) // Enviar el ID del usuario autenticado
            });

            if (!response.ok) throw new Error("Error al enviar la solicitud de match");

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, matchStatus: "pending" } : user
                )
            );
        } catch (error) {
            console.error("Error al hacer match:", error);
        }
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
                                        src={user.image || "https://archive.org/download/placeholder-image/placeholder-image.jpg"}
                                        alt="Perfil"
                                        className="img-fluid rounded-circle"
                                        style={{ cursor: "pointer", width: "150px", height: "150px", objectFit: "cover" }}
                                        onClick={() => goToUserProfile(user)}
                                    />
                                    <div className="mt-3">
                                        {user.skills && user.skills.length > 0 ? (
                                            user.skills.map((skill, i) => (
                                                <span key={i} className="badge bg-secondary me-1">
                                                    {skill.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="badge bg-warning">Sin habilidades registradas</span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className="fw-bold" style={{ cursor: "pointer" }} onClick={() => goToUserProfile(user)}>
                                            {user.name}
                                        </h3>
                                        <p>{user.description || "No hay descripción disponible"}</p>
                                        <div className="text-center mt-5">
                                            <p className="text-muted">{user.date || "Fecha no disponible"}</p>

                                            {user.matchStatus === "matched" ? (
                                                <button className="btn btn-dark shadow" onClick={() => goToChat(user)}>Chatear</button>
                                            ) : (
                                                <button
                                                    className={`btn shadow ${user.matchStatus === "pending" ? "btn-secondary" : "btn-success"}`}
                                                    onClick={() => handleMatch(user.id)}
                                                    disabled={user.matchStatus === "pending"}
                                                >
                                                    {user.matchStatus === "pending" ? "Solicitud Enviada" : "Hacer Match 💚"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {users.length === 0 && <p className="text-center">No hay usuarios disponibles</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
