import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Notification from './Notification';


const AppLayout = ({ children, showAuthLinks = true }) => {
  const { user, logout } = useAuth();

  return (
    <div className="app-container">
      {/* 3D Background Elements */}
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      
      <header className="app-header">
        <nav className="navbar">
          <Link to="/" className="logo">💸 QuantumExpense 💸</Link>
          {showAuthLinks && (
            <div className="nav-links">
              {user ? (
                <>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/reports">Reports</Link>
                  {user.role === 'admin' && <Link to="/admin">Admin</Link>}
                  <Link to="/settings">Settings</Link>
                  <button onClick={logout} className="btn-logout">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>
          )}
        </nav>
      </header>
      
      <Notification />
      
      <main className="app-main">
        {children || <Outlet />}
      </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Expense Tracker</p>
      </footer>
    </div>
  );
};

export default AppLayout;