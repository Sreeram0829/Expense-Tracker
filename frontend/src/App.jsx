import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Component Imports
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import Settings from './components/Settings';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Register from './components/Register';
import Unauthorized from './components/Unauthorized';

// Core Styles
import './styles/main.css';
import './styles/theme.css';

// Layout Styles
import './styles/layout.css';
import './styles/3d-background.css';

// Component-Specific Styles
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/charts.css';
import './styles/reports.css';
import './styles/settings.css';
import './styles/admin.css';
import './styles/unauthorized.css';
import './styles/home.css';

// UI Element Styles
import './styles/buttons.css';
import './styles/forms.css';
import './styles/cards.css';
import './styles/tables.css';
import './styles/modals.css';
import './styles/notifications.css';

const App = () => {
  // Initialize dark mode from localStorage
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ExpenseProvider>
          {/* Main Routes */}
          <Routes>
            {/* Public Home Route */}
            <Route path="/" element={<Home />} />

            {/* Public Routes with Layout */}
            <Route element={<AppLayout showAuthLinks={false} />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Route>

            {/* Protected Routes with Layout */}
            <Route element={<AppLayout showAuthLinks={true} />}>
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute roles={['admin']}>
                  <AdminPanel />
                </ProtectedRoute>
              } />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ExpenseProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;