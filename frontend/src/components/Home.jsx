import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Background image */}
      <div className="background-3d-home"></div>


      <div className="home-container">
        <div className="hero-section">
          <h1 className="title-3d">Quantum Expense</h1>
          <p className="subtitle">Smart financial tracking for the modern world</p>

          <div className="auth-actions">
            <Link to="/login" className="auth-btn">Login</Link>
            <Link to="/register" className="auth-btn">Sign Up</Link>
          </div>

          <Link to="/dashboard" className="get-started-btn">
            Get Started
          </Link>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-time Tracking</h3>
            <p>Monitor your expenses as they happen</p>
          </div>
          <div className="feature-card">
            <h3>Advanced Reports</h3>
            <p>Detailed insights into your spending</p>
          </div>
          <div className="feature-card">
            <h3>Secure & Private</h3>
            <p>Your data stays with you</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
