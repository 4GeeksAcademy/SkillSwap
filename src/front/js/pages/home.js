import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Home = () => {
        const { store, actions } = useContext(Context);

        return (
                <div className="container-fluid min-vh-100">
                        {/* Hero Section */}
                        <div className="text-center py-5" style={{ backgroundColor: "#FBEDE6" }}>
                                <h1 className="fw-bold">
                                        Skill <span style={{ color: "red" }}>& Swap</span>
                                </h1>
                                <p className="text-muted">
                                        Exchange skills and knowledge with people around the world.
                                </p>
                                <div className="d-flex justify-content-center">
                                        <input type="text" className="form-control w-50" placeholder="Search..." />
                                </div>
                        </div>

                        {/* Skills and Abilities */}
                        <div class="container py-5">

                                <h2 class="text-center fw-bold">Skills and Abilities</h2>


                                <ul class="nav nav-pills justify-content-center mt-3">
                                        <li class="nav-item">
                                                <a class="nav-link active bg-danger text-white" href="#">All</a>
                                        </li>
                                        <li class="nav-item">
                                                <a class="nav-link text-dark" href="#">Languages</a>
                                        </li>
                                        <li class="nav-item">
                                                <a class="nav-link text-dark" href="#">Sports</a>
                                        </li>
                                        <li class="nav-item">
                                                <a class="nav-link text-dark" href="#">Coding</a>
                                        </li>
                                        <li class="nav-item">
                                                <a class="nav-link text-dark" href="#">Health</a>
                                        </li>
                                        <li class="nav-item">
                                                <a class="nav-link text-dark" href="#">Cooking</a>
                                        </li>
                                        <li class="nav-item">
                                                <a class="nav-link text-dark" href="#">Tech</a>
                                        </li>
                                </ul>


                                <div class="row mt-4">

                                        <div class="col-md-6">
                                                <div class="card shadow-sm border-0">
                                                        <div class="row g-0 align-items-center">
                                                                <div class="col-3">
                                                                        <img src="https://i.pinimg.com/736x/35/d4/a6/35d4a62fad980e8f5a410d3a6bc3f219.jpg" class="img-fluid rounded-start" alt="Lucia" />
                                                                </div>
                                                                <div class="col-9">
                                                                        <div class="card-body">
                                                                                <h5 class="card-title text-danger fw-bold">Lucia Canalda</h5>
                                                                                <p class="card-text text-muted">A nature survey shows many scientists expect the virus that causes COVID-19...</p>
                                                                                <span class="badge bg-light text-dark">COVID-19</span>
                                                                                <span class="badge bg-light text-dark">Scaling</span>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>


                                        <div class="col-md-6">
                                                <div class="card shadow-sm border-0">
                                                        <div class="row g-0 align-items-center">
                                                                <div class="col-3">
                                                                        <img src="https://i.pinimg.com/736x/8a/28/49/8a2849a63361dde038c098fa2827d2b4.jpg" class="img-fluid rounded-start" alt="Aaron" />
                                                                </div>
                                                                <div class="col-9">
                                                                        <div class="card-body">
                                                                                <h5 class="card-title fw-bold">Aaron Barcos</h5>
                                                                                <p class="card-text text-muted">Tesla’s vehicles boast 'Full-Self-Driving' (FSD), but current regulations do not...</p>
                                                                                <span class="badge bg-light text-dark">Automation</span>
                                                                                <span class="badge bg-light text-dark">Tech</span>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>


                                        <div class="col-md-6 mt-3">
                                                <div class="card shadow-sm border-0">
                                                        <div class="row g-0 align-items-center">
                                                                <div class="col-3">
                                                                        <img src="https://i.pinimg.com/736x/88/e8/e8/88e8e86bfba06d47628f3c7751a820c7.jpg" class="img-fluid rounded-start" alt="Diego" />
                                                                </div>
                                                                <div class="col-9">
                                                                        <div class="card-body">
                                                                                <h5 class="card-title fw-bold">Diego SB</h5>
                                                                                <p class="card-text text-muted">A look back at history shows that women have made great strides...</p>
                                                                                <span class="badge bg-light text-dark">Women’s Rights</span>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>


                                        <div class="col-md-6 mt-3">
                                                <div class="card shadow-sm border-0">
                                                        <div class="row g-0 align-items-center">
                                                                <div class="col-3">
                                                                        <img src="https://i.pinimg.com/736x/cf/55/a3/cf55a38599b8bc9d88897970d32b02eb.jpg" class="img-fluid rounded-start" alt="Alejandro" />
                                                                </div>
                                                                <div class="col-9">
                                                                        <div class="card-body">
                                                                                <h5 class="card-title text-danger fw-bold">Alejandro Gil</h5>
                                                                                <p class="card-text text-muted">We have a therapist expert as our guest, Krista Gordon is still...</p>
                                                                                <span class="badge bg-light text-dark">Self-Esteem</span>
                                                                                <span class="badge bg-light text-dark">Health</span>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                        <div class="col-md-6 mt-3">
                                                <div class="card shadow-sm border-0">
                                                        <div class="row g-0 align-items-center">
                                                                <div class="col-3">
                                                                        <img src="https://i.pinimg.com/736x/b9/6e/a4/b96ea4aef97546325f9cdf4a03e4df2c.jpg" class="img-fluid rounded-start" alt="Lucia" />
                                                                </div>
                                                                <div class="col-9">
                                                                        <div class="card-body">
                                                                                <h5 class="card-title text-danger fw-bold">María García</h5>
                                                                                <p class="card-text text-muted">A nature survey shows many scientists expect the virus that causes COVID-19...</p>
                                                                                <span class="badge bg-light text-dark">COVID-19</span>
                                                                                <span class="badge bg-light text-dark">Scaling</span>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                        <div class="col-md-6 mt-3">
                                                <div class="card shadow-sm border-0">
                                                        <div class="row g-0 align-items-center">
                                                                <div class="col-3">
                                                                        <img src="https://i.pinimg.com/736x/3b/0f/7e/3b0f7e6bac61a6cf2e1a6cb1f09dd836.jpg" class="img-fluid rounded-start" alt="Aaron" />
                                                                </div>
                                                                <div class="col-9">
                                                                        <div class="card-body">
                                                                                <h5 class="card-title fw-bold">Paula Fernández</h5>
                                                                                <p class="card-text text-muted">Tesla’s vehicles boast 'Full-Self-Driving' (FSD), but current regulations do not...</p>
                                                                                <span class="badge bg-light text-dark">Automation</span>
                                                                                <span class="badge bg-light text-dark">Tech</span>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                </div>
                        </div>

                        {/* Testimonials */}
                        <div className="container-fluid w-100 min-vh-50 d-flex flex-column justify-content-center align-items-center py-5" style={{ backgroundColor: "#FBEDE6" }}>
                                {/* Título */}
                                <h2 className="text-center fw-bold">What Our Users Say</h2>
                                <p className="text-center text-muted">Their experiences through our platform</p>

                                {/* Carrusel de Testimonios */}
                                <div id="testimonialCarousel" className="carousel slide " data-bs-ride="carousel" >
                                        <div className="carousel-inner">

                                                {/* Testimonio 1 */}
                                                <div className="carousel-item active">
                                                        <div className="card border-0 shadow p-3 text-center mx-auto" style={{ maxWidth: "500px" }}>
                                                        <p className="text-muted">
                                                                        "Skills & Swap changed the way I learn! I was able to exchange my coding skills for Spanish lessons."
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

                                                {/* Testimonio 2 */}
                                                <div className="carousel-item">
                                                        <div className="card border-0 shadow p-3 text-center mx-auto" style={{ maxWidth: "500px" }}>
                                                        <p className="text-muted">
                                                                        "I swapped my marketing expertise for graphic design skills, and it was an amazing experience!"
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

                                                {/* Testimonio 3 */}
                                                <div className="carousel-item">
                                                        <div className="card border-0 shadow p-3 text-center mx-auto" style={{ maxWidth: "500px" }}>
                                                        <p className="text-muted">
                                                                        "A wonderful platform to share knowledge! I improved my programming skills thanks to great mentors."
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

                                        {/* Controles del Carrusel */}
                                        <div className="d-flex position-absolute bottom-0 start-0 ms-3 mb-3">
                                                <button className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center me-2"
                                                        type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev"
                                                        style={{ width: "40px", height: "40px" }}>
                                                        <i className="fas fa-chevron-left"></i>
                                                </button>
                                                <button className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
                                                        type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next"
                                                        style={{ width: "40px", height: "40px" }}>
                                                        <i className="fas fa-chevron-right"></i>
                                                </button>
                                        </div>
                                </div>
                        </div>


                       
                </div>
        );
};
