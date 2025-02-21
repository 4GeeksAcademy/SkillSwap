import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const UserProfile = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/users/${id}`); 
                if (!response.ok) throw new Error("Usuario no encontrado");

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <p className="text-center mt-5">Cargando usuario...</p>;
    if (!user) return <p className="text-center mt-5 text-danger">Usuario no encontrado</p>;

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-3 w-100" style={{ backgroundColor: "#FBECE5" }}>
                        <div className="row">
                            <div className="col-md-4 text-center">
                                <img 
                                    src={user.profile_pic_src || "https://archive.org/download/placeholder-image/placeholder-image.jpg"}  
                                    alt="Perfil" 
                                    className="img-fluid rounded-circle" 
                                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                />
                                <div className="mt-3">
                                    {user.skills && user.skills.length > 0 ? (
                                        user.skills.map((skill, i) => (
                                            <span key={i} className="badge bg-secondary me-1">{skill.name}</span>
                                        ))
                                    ) : (
                                        <span className="badge bg-warning">Sin habilidades registradas</span>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-8">
                                <h3 className="fw-bold">{user.name}</h3>
                                <p>{user.description || "No hay descripción disponible"}</p>
                                <p><strong>Email:</strong> {user.email || "No disponible"}</p>
                                <p><strong>Fecha de Registro:</strong> {user.date || "No disponible"}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
