import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// ✅ Set backend server base URL so axios can reach Express
axios.defaults.baseURL = 'http://localhost:5000';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      setToken(token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setAuthToken(res.data.token);
      setUser(jwtDecode(res.data.token));
      navigate('/dashboard');
      return true;
    } catch (err) {
      console.error('Login error:', err.response?.data);
      throw err.response?.data?.message || 'Login failed';
    }
  };

  const register = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/register', { email, password });
      setAuthToken(res.data.token);
      setUser(jwtDecode(res.data.token));
      navigate('/dashboard');
      return true;
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      throw err.response?.data?.message || 'Registration failed';
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = () => !!user;
  const hasRole = (role) => user?.role === role;

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            logout();
          } else {
            setAuthToken(token);
            setUser(decoded);
          }
        } catch (err) {
          logout();
        }
      }
      setLoading(false);
    };
    verifyToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      loading,
      login,
      register,
      logout,
      isAuthenticated,
      hasRole
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
