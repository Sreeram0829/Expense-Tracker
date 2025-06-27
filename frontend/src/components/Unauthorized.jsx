import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Unauthorized = () => {
  const { user, logout } = useAuth();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <div className="error-code">403</div>
        <h1>Access Denied</h1>
        <p className="message">
          {user
            ? "You don't have permission to access this page."
            : "Please log in to access this page."}
        </p>
        
        <div className="action-buttons">
          {user ? (
            <>
              <button onClick={logout} className="btn-logout">
                Logout
              </button>
              <Link to="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn-secondary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;