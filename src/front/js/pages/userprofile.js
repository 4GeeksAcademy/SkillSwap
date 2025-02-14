import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/users/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [id]);

    const goToChat = () => {
        navigate("/chat", { state: user });
    };

    if (!user) return <p className="text-center mt-5">Cargando usuario...</p>;

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-3 w-100" style={{ backgroundColor: "#FBECE5" }}>
                        <div className="row">
                            <div className="col-md-4 text-center">
                                <img src={user.image} alt="Perfil" className="img-fluid rounded-circle" />
                                <div className="mt-3">
                                    {user.skills?.map((skill, i) => (
                                        <span key={i} className="badge bg-secondary me-1">{skill.name}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="col-md-8">
                                <h3 className="fw-bold">{user.name}</h3>
                                <p>{user.description}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Fecha de Registro:</strong> {user.date}</p>

                                <div className="text-center mt-4">
                                    <button className="btn btn-dark shadow" onClick={goToChat}>Chatear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
