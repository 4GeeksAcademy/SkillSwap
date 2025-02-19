import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import "../../styles/pricing.css"; 

const Pricing = () => {
    // Sample reviews data
    const reviews = [
        {
            id: 1,
            user: "Alice Johnson",
            review: "SkillSwap has transformed my learning experience! Highly recommended!",
            rating: "⭐⭐⭐⭐⭐"
        },
        {
            id: 2,
            user: "Mark Smith",
            review: "I found amazing courses and met great people. SkillSwap is the way to go!",
            rating: "⭐⭐⭐⭐"
        },
        {
            id: 3,
            user: "Rachel Green",
            review: "Fantastic platform! The tutors are very knowledgeable and supportive.",
            rating: "⭐⭐⭐⭐⭐"
        },
        {
            id: 4,
            user: "John Doe",
            review: "SkillSwap made it easy for me to learn new skills from the best!",
            rating: "⭐⭐⭐⭐"
        }
    ];

    // State to track the current review index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to go to the next review
    const nextReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    // Function to go to the previous review
    const prevReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    };

    return (
        <div className="pricing-container">
            <h1 className="pricing-title">Pricing Plans</h1>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                {/* Free Plan Card */}
                <div className="card">
                    <h2 className="card-title">Free Plan</h2>
                    <p className="card-description">Enjoy basic features for free!</p>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li>✔️ Feature One</li>
                        <li>✔️ Feature Two</li>
                        <li>✔️ Feature Three</li>
                    </ul>
                    <Link to="/signup">
                        <button className="card-button">Get Started</button>
                    </Link>
                </div>

                {/* Premium Plan Card */}
                <div className={`card premium-card`}>
                    <h2 className={`card-title premium`}>Premium Plan</h2>
                    <p className={`card-description premium`}>Coming Soon!</p>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li className="premium">✔️ Feature One</li>
                        <li className="premium">✔️ Feature Two</li>
                        <li className="premium">✔️ Feature Three</li>
                    </ul>
                    <button className={`card-button premium`} disabled>Coming Soon</button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section" style={{ marginTop: '4rem', textAlign: 'center' }}>
                <h2>User Reviews</h2>
                <div className="review-card">
                    <p className="review-user">{reviews[currentIndex].user}</p>
                    <p className="review-rating">{reviews[currentIndex].rating}</p>
                    <p className="review-text">"{reviews[currentIndex].review}"</p>
                </div>
                <div className="review-navigation">
                    <button onClick={prevReview} disabled={currentIndex === 0}>Previous</button>
                    <button onClick={nextReview} disabled={currentIndex === reviews.length - 1}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;