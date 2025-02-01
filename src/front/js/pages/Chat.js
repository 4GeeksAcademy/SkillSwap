import React, { useState } from "react";

export const Chat = () => {
    const [messages, setMessages] = useState([]); 
    const [input, setInput] = useState(""); 

    const sendMessage = () => {
        if (input.trim() !== "") {
            setMessages([...messages, { text: input, sender: "user" }]);
            setInput(""); 
        }
    };

    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card p-3" style={{ backgroundColor: "#FBECE5", height: "500px", display: "flex", flexDirection: "column" }}>
                    <div className="row align-items-center border-bottom pb-2">
                        <div className="col-md-4 text-center">
                            <img
                                src="https://i.pinimg.com/736x/38/89/c1/3889c1a08d0e4cd479007420838dcb79.jpg"
                                alt="Perfil"
                                className="img-fluid rounded-circle"
                                style={{ width: "80px", height: "80px" }}
                            />
                        </div>
                        <div className="col-md-8">
                            <h4 className="fw-bold mb-0">Lucia Canalda</h4>
                            <span className="badge bg-secondary me-1">Aventura</span>
                            <span className="badge bg-secondary">Healthy</span>
                        </div>
                    </div>

                    <div className="flex-grow-1 overflow-auto mt-3" style={{ maxHeight: "300px", padding: "10px", backgroundColor: "#fff", borderRadius: "5px" }}>
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
