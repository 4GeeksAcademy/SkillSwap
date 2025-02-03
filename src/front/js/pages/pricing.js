import React from 'react';
import "../../styles/pricing.css"; 

const Pricing = () => {
    return (
        <div className="pricing-container">
            <h1 className="pricing-title">Pricing Plans</h1>
            <div style={{ display: 'flex', gap: '2rem' }}>
                {/* Free Plan Card */}
                <div className="card">
                    <h2 className="card-title">Free Plan</h2>
                    <p className="card-description">Enjoy basic features for free!</p>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li>✔️ Feature One</li>
                        <li>✔️ Feature Two</li>
                        <li>✔️ Feature Three</li>
                    </ul>
                    <button className="card-button">Get Started</button>
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
        </div>
    );
};

export default Pricing;