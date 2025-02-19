import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const UserCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state; 

    
    const goToChat = () => {
        navigate("/chat", { state: user });
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-3 w-100" style={{ backgroundColor: "#FBECE5" }}>
                        <div className="row">
                            <div className="col-md-4 text-center">
                                <img src={user.image || "https://archive.org/download/placeholder-image/placeholder-image.jpg"}  alt="Perfil" className="img-fluid rounded-circle" />
                                <div className="mt-3">
                                    {user?.tags?.map((tag, i) => (
                                        <span key={i} className="badge bg-secondary me-1">{tag}</span>
                                    ))}
                                </div>
                            </div>


                            <div className="col-md-8">
                                <h3 className="fw-bold">{user?.name}</h3>
                                <p>{user?.description}</p>

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
