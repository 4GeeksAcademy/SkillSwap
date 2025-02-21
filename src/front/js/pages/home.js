import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [feedData, setfeedData] = useState([]);
  const [originalFeedData, setOriginalFeedData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const habilities = [
    "Art",
    "Design",
    "Development",
    "Marketing",
    "Music",
    "Photography",
    "Video",
    "Writing",
    "Other",
  ];

  // Al cargar los datos, guarda también la lista original:
  useEffect(() => {
    if (!store?.auth?.user?.id) return;
    const fetchUsersWithSkills = async () => {
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/feed/${store.auth.user.id}?page=${page}&per_page=6`
        );
        if (!response.ok) {
          throw new Error("Error al obtener usuarios");
        }
        let data = await response.json();
        setfeedData(data.feed);
        setOriginalFeedData(data.feed); // Guarda la lista original
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

      setfeedData((prevData) =>
        prevData.map((data) =>
          data.user.id === userId ? { ...data, match_status: "pending" } : data
        )
      );
    } catch (error) {
      console.error("Error al hacer match:", error);
    }
  };

  const filterByHability = (hability) => {
    if (hability.toLowerCase() === "all") {
      return setfeedData(originalFeedData);
    }
    const filtered = originalFeedData.filter(
      (data) =>
        data.skills &&
        data.skills.some(
          (skill) =>
            skill.skill_category.toLowerCase() === hability.toLowerCase() ||
            skill.skill_subcategory.toLowerCase() === hability.toLowerCase()
        )
    );
    setfeedData(filtered);
  };

  return (
    <div className="container-fluid min-vh-100 min-vw-100">
      <div className="text-center py-5" style={{ backgroundColor: "#FBEDE6" }}>
        <h1 className="fw-bold">
          Skill <span style={{ color: "red" }}>& Swap</span>
        </h1>
        <p className="text-muted">
          Exchange skills and knowledge with people around the world.
        </p>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-50 w-md-50 w-lg-25"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="container-fluid p-5">
        <h2 className="text-center fw-bold">Skills and Abilities</h2>

        <ul className="nav nav-pills justify-content-center mt-3">
          <li onClick={() => filterByHability("all")} className="nav-item">
            <a className="nav-link text-dark" href="#">
              All
            </a>
          </li>
          {habilities.map((hability, index) => {
            return (
              <li
                onClick={() => filterByHability(hability)}
                className="nav-item"
                key={index}
              >
                <a className="nav-link text-dark" href="#">
                  {hability}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 mt-4">
          {feedData.map((data, index) => {
            const lookingForSkill = data.skills.find(
              (skill) => skill.skill_type === "Looking For"
            );
            const offeringSkill = data.skills.find(
              (skill) => skill.skill_type === "Offering"
            );
            return (
              <div className="col-md-6 d-flex mb-3" key={index}>
                <div
                  className="card shadow-sm border-0 w-100 h-100"
                  style={{ backgroundColor: "#FBECE5" }}
                >
                  <div className="row g-0 align-items-center">
                    <div className="col-3">
                      <img
                        src={
                          data.user.profile_pic_src ||
                          "https://archive.org/download/placeholder-image/placeholder-image.jpg"
                        }
                        alt="Perfil"
                        className="img-fluid rounded-start cursor-pointer"
                        onClick={() => goToUserProfile(data.user)}
                        style={{
                          width: "150px",
                          aspectRatio: "1",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-9">
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{data.user.name}</h5>
                        <p className="card-text text-muted">
                          {data.user.description ||
                            "No hay descripción disponible"}
                        </p>
                      </div>
                      <div
                        className="mt-2 mb-5"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {lookingForSkill ? (
                          <span className="badge bg-primary text-white d-block mb-1">
                            Buscando: {lookingForSkill.skill_category} -{" "}
                            {lookingForSkill.skill_subcategory}
                          </span>
                        ) : (
                          <span className="badge bg-secondary d-block mb-1">
                            No busca habilidad
                          </span>
                        )}
                        {offeringSkill ? (
                          <span className="badge bg-success text-white d-block">
                            Ofreciendo: {offeringSkill.skill_category} -{" "}
                            {offeringSkill.skill_subcategory}
                          </span>
                        ) : (
                          <span className="badge bg-secondary d-block">
                            No ofrece habilidad
                          </span>
                        )}
                      </div>
                      <div className="text-center mb-3">
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
              </div>
            );
          })}
          {feedData.length === 0 && (
            <p className="text-center">No hay usuarios disponibles</p>
          )}
        </div>
      </div>

      <nav aria-label="Page navigation" className="mt-4">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ margin: "0 auto" }}
        >
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

      {!store.auth.isAuthenticated && (
        <div
          className="container-fluid w-100 min-vh-50 d-flex flex-column justify-content-center align-items-center py-5"
          style={{ backgroundColor: "#FBEDE6" }}
        >
          <h2 className="text-center fw-bold">What Our Users Say</h2>
          <p className="text-center text-muted">
            Their experiences through our platform
          </p>

          <div
            id="testimonialCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="card border-0 shadow p-3 text-center mx-auto w-50 h-50">
                  <p className="text-muted">
                    "Skills & Swap changed the way I learn! I was able to
                    exchange my coding skills for Spanish lessons."
                  </p>
                  <img
                    src="https://i.pinimg.com/736x/35/d4/a6/35d4a62fad980e8f5a410d3a6bc3f219.jpg"
                    className="rounded-circle mx-auto d-block"
                    style={{ width: "60px", height: "60px" }}
                    alt="User 1"
                  />

                  <h5 className="fw-bold">Lucia Canalda</h5>
                  <p className="text-danger">Developer & Language Learner</p>
                </div>
              </div>

              <div className="carousel-item">
                <div className="card border-0 shadow p-3 text-center mx-auto w-50 h-50">
                  <p className="text-muted">
                    "I swapped my marketing expertise for graphic design skills,
                    and it was an amazing experience!"
                  </p>
                  <img
                    src="https://i.pinimg.com/736x/8a/28/49/8a2849a63361dde038c098fa2827d2b4.jpg"
                    className="rounded-circle mx-auto d-block"
                    style={{ width: "60px", height: "60px" }}
                    alt="User 2"
                  />

                  <h5 className="fw-bold">Aaron Barcos</h5>
                  <p className="text-danger">Marketing Specialist</p>
                </div>
              </div>

              <div className="carousel-item">
                <div className="card border-0 shadow p-3 text-center mx-auto w-50 h-50">
                  <p className="text-muted">
                    "A wonderful platform to share knowledge! I improved my
                    programming skills thanks to great mentors."
                  </p>
                  <img
                    src="https://i.pinimg.com/736x/cf/55/a3/cf55a38599b8bc9d88897970d32b02eb.jpg"
                    className="rounded-circle mx-auto d-block"
                    style={{ width: "60px", height: "60px" }}
                    alt="User 3"
                  />

                  <h5 className="fw-bold">Alejandro Gil</h5>
                  <p className="text-danger">Software Engineer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex m-3">
            <button
              className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center me-2"
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide="prev"
              style={{ width: "40px", height: "40px" }}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide="next"
              style={{ width: "40px", height: "40px" }}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
