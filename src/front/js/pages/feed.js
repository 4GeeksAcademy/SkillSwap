// feed.js

import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Feed = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [feeddata, setFeeddata] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!store?.auth?.user?.id) return;
    const fetchUsersWithSkills = async () => {
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/feed/${store.auth.user.id}?page=${page}&per_page=5`
        );
        if (!response.ok) {
          throw new Error("Error al obtener usuarios");
        }
        let data = await response.json();
        setFeeddata(data.feed);
        setTotalPages(data.pages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersWithSkills();
  }, [store?.auth?.user?.id, page]);

  const goToUserProfile = (user) => {
    navigate(`/user/${user.id}`);
  };

  const goToChat = (user) => {
    navigate("/chat", { state: user });
  };

  const requestMatch = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/match-requests`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sender_user_id: store.auth.user.id,
            receiver_user_id: userId,
          }),
        }
      );

      if (!response.ok)
        throw new Error("Error al enviar la solicitud de match");

      setFeeddata((prevData) =>
        prevData.map((data) =>
          data.user.id === userId ? { ...data, match_status: "pending" } : data
        )
      );
    } catch (error) {
      console.error("Error al hacer match:", error);
    }
  };

  if (!store.auth.user) {
    return (
      <div className="login-background">
        <div className="container">
          <div className="card p-4" style={{ backgroundColor: "#FBECE5" }}>
            <p className="text-center">
              <a href="/login" className="text-decoration-none">
                Inicia sesión
              </a>{" "}
              o{" "}
              <a href="/signup" className="text-decoration-none">
                regístrate
              </a>{" "}
              para ver el feed
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card p-4 w-100 bg-light shadow-sm">
            {feeddata.map((data, index) => (
              <div className="row mb-4" key={index}>
                <div className="col-md-4 text-center">
                  <img
                    src={
                      data.user.image ||
                      "https://archive.org/download/placeholder-image/placeholder-image.jpg"
                    }
                    alt="Perfil"
                    className="img-fluid rounded-circle cursor-pointer"
                    onClick={() => goToUserProfile(data.user)}
                    style={{ width: "150px", aspectRatio: "1", objectFit: "cover" }}
                  />
                  <div className="mt-3">
                    {data.user.skills && data.user.skills.length > 0 ? (
                      data.user.skills.map((skill, i) => (
                        <span key={i} className="badge bg-secondary me-1">
                          {skill.name}
                        </span>
                      ))
                    ) : (
                      <span className="badge bg-warning">
                        Sin habilidades registradas
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h3
                      className="fw-bold cursor-pointer"
                      onClick={() => goToUserProfile(data.user)}
                    >
                      {data.user.name}
                    </h3>
                    <p>
                      {data.user.description || "No hay descripción disponible"}
                    </p>
                    <div className="text-center mt-5">
                      {data.match_status === "matched" ? (
                        <button
                          className="btn btn-dark shadow"
                          onClick={() => goToChat(data.user)}
                        >
                          Chatear
                        </button>
                      ) : (
                        <button
                          className={`btn shadow ${
                            data.match_status === "pending"
                              ? "btn-secondary"
                              : "btn-danger"
                          }`}
                          onClick={() => requestMatch(data.user.id)}
                          disabled={data.match_status === "pending"}
                        >
                          {data.match_status === "pending"
                            ? "Solicitud Enviada"
                            : "MATCH"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {feeddata.length === 0 && (
              <p className="text-center">No hay usuarios disponibles</p>
            )}
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation" className="mt-4">
        <div className="d-flex justify-content-center align-items-center">
          <button
            className={`btn ${page === 1 ? "disabled" : ""} me-3`}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            className={`btn ${page === totalPages ? "disabled" : ""} ms-3`}
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Siguiente
          </button>
        </div>
      </nav>
    </div>
  );
};
