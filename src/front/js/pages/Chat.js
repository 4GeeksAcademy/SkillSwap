import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Chat = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state; 

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");


    const goToUserProfile = () => {
        navigate("/usercard", { state: user });
    };


    const sendMessage = () => {
        if (input.trim() !== "") {
            setMessages([...messages, { text: input, sender: "user" }]);
            setInput("");
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-3 w-100" style={{ backgroundColor: "#FBECE5", height: "500px", display: "flex", flexDirection: "column" }}>
                        

                        <div className="row justify-content-center align-items-center border-bottom pb-2 w-100">
                            <div className="col-md-4 text-center">
                                <img
                                    src={user?.image || "https://via.placeholder.com/80"}
                                    alt="Perfil"
                                    className="img-fluid rounded-circle"
                                    style={{ width: "80px", height: "80px", cursor: "pointer" }}
                                    onClick={goToUserProfile}
                                />
                            </div>
                            <div className="col-md-8">
                                <h4 className="fw-bold mb-0" style={{ cursor: "pointer" }} onClick={goToUserProfile}>
                                    {user?.name || "Usuario Desconocido"}
                                </h4>
                                {user?.tags?.map((tag, i) => (
                                    <span key={i} className="badge bg-secondary me-1">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="flex-grow-1 overflow-auto mt-3 w-100" style={{ maxHeight: "300px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px" }}>
                            {messages.length === 0 ? (
                                <p className="text-muted text-center">No hay mensajes aún.</p>
                            ) : (
                                messages.map((msg, index) => (
                                    <div key={index} className={`d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"} mb-2`}>
                                        <div className={`p-2 rounded ${msg.sender === "user" ? "bg-primary text-white" : "bg-light"}`} style={{ maxWidth: "75%" }}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="input-group mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Escribe un mensaje..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button className="btn btn-outline-dark" onClick={sendMessage}>Enviar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
