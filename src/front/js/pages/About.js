import React from "react";

export const About = () => {
    return (
        <div className="container-fluid min-vh-100" style={{ backgroundColor: "#F5ECE5" }}>
            <div className="container py-5">
                {/* Sección de Encabezado */}
                <div className="text-center">
                    <h1 className="fw-bold">About Skills & Swap</h1>
                    <p className="text-muted">Learn more about our mission, history, and the team behind our platform.</p>
                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-outline-dark">Log In</button>
                        <button className="btn btn-dark">Join Us</button>
                    </div>
                </div>

                {/* Sección de Estadísticas */}
                <div className="row text-center mt-5">
    <div className="col-md-4">
        <div className="border border-danger shadow-lg p-4 bg-white" style={{ boxShadow: "0px 4px 10px rgba(225, 29, 29, 0.3)" }}>
            <h2 className="text-danger fw-bold">276K</h2>
            <p className="fw-semibold">Community Members</p>
        </div>
    </div>
    <div className="col-md-4">
        <div className="border border-danger shadow-lg p-4 bg-white" style={{ boxShadow: "0px 4px 10px rgba(255, 0, 0, 0.3)" }}>
            <h2 className="text-danger fw-bold">128K</h2>
            <p className="fw-semibold">Published Swaps</p>
        </div>
    </div>
    <div className="col-md-4">
        <div className="border border-danger shadow-lg p-4 bg-white" style={{ boxShadow: "0px 4px 10px rgba(255, 0, 0, 0.3)" }}>
            <h2 className="text-danger fw-bold">59K</h2>
            <p className="fw-semibold">Skills Traded</p>
        </div>
    </div>
</div>


                {/* Sección "What our community says" */}
                <div className="text-center mt-5">
                    <h2 className="fw-bold">What our community says</h2>
                    <p className="text-muted">Their experience through our platform</p>
                    <div className="mt-3">
                        <img src="https://i.pinimg.com/736x/74/f4/67/74f467ed1c5b5f4466ef5c396585c7ab.jpg" alt="Community" className="img-fluid rounded shadow" />
                    </div>
                </div>

                {/* Sección "About and History" */}
                <div className="mt-5 text-center">
                    <h3 className="fw-bold">About and History</h3>
                    <p className="text-muted">
                        In our drive to facilitate exchanges of expertise and skills, <b>Skills & Swap</b> was born. 
                        Our mission is to connect individuals eager to trade their knowledge in an accessible way.
                    </p>
                    <p className="text-muted">
                        We believe in <b>collaborative learning</b> and making skill exchange simple, fun, and rewarding.
                    </p>
                </div>

                {/* Sección "The Founders" */}
                <div className="text-center mt-5">
                    <h3 className="fw-bold">The Founders</h3>
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="border p-3 rounded shadow-sm bg-white">
                                <img src="https://i.pinimg.com/736x/35/d4/a6/35d4a62fad980e8f5a410d3a6bc3f219.jpg" alt="Founder 1" className="img-fluid rounded w-100" />
                                <h5 className="mt-3 fw-bold">Lucia Canalda</h5>
                                <p className="text-muted">Co-Founder</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="border p-3 rounded shadow-sm bg-white">
                                <img src="https://i.pinimg.com/736x/8a/28/49/8a2849a63361dde038c098fa2827d2b4.jpg" alt="Founder 2" className="img-fluid rounded w-100" />
                                <h5 className="mt-3 fw-bold">Aaron barcos</h5>
                                <p className="text-muted">Co-Founder</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="border p-3 rounded shadow-sm bg-white">
                                <img src="https://i.pinimg.com/736x/cf/55/a3/cf55a38599b8bc9d88897970d32b02eb.jpg" alt="Founder 2" className="img-fluid rounded w-100" />
                                <h5 className="mt-3 fw-bold">Alejandro Gil</h5>
                                <p className="text-muted">Co-Founder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
