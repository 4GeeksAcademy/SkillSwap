import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PrivateSpace = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]); // State to hold user data

    useEffect(() => {
        const fetchUsersWithSkills = async () => {
            try {
                const response = await fetch("/users/skills"); // Adjust the API endpoint as necessary
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data); // Set the fetched data to state
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsersWithSkills(); // Call the fetch function
    }, []); // Empty dependency array means this runs once when the component mounts

    const goToUserProfile = (user) => {
        navigate("/usercard", { state: user }); 
    };

    const goToChat = (user) => {
        navigate("/chat", { state: user }); 
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
                                        src={user.image} // Ensure your user data has an image property
                                        alt="Perfil"
                                        className="img-fluid rounded-circle"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => goToUserProfile(user)} 
                                    />
                                    <div className="mt-3">
                                        {user.skills.map((skill, i) => ( // Change tags to skills
                                            <span key={i} className="badge bg-secondary me-1">{skill.name}</span> // Adjust based on your skill data structure
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h3 className="fw-bold" style={{ cursor: "pointer" }} onClick={() => goToUserProfile(user)}>
                                            {user.name}
                                        </h3>
                                        <p>{user.description}</p> {/* Ensure this is included in your user data */}
                                        <div className="text-center mt-5">
                                            <p className="text-muted">{user.date}</p> {/* Ensure this is included in your user data */}
                                            <button className="btn btn-dark me-3 shadow" onClick={() => goToChat(user)}>Chatear</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};