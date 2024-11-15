import React, { createContext, useState, useContext } from 'react';
import api from './api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data.data;
      setUser(user);
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setLoading(false);
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      setAuthError(error.response?.data?.error || 'Invalid email or password');
      setLoading(false);
      return { success: false, error: authError };
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await api.post('/auth/signup', { name, email, password });
      setLoading(false);
      return { success: true, message: 'Signup successful. Please log in.' };
    } catch (error) {
      console.error('Signup error:', error);
      setAuthError(error.response?.data?.error || 'Failed to create account');
      setLoading(false);
      return { success: false, error: authError };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, authError }}>
      {children}
    </AuthContext.Provider>
  );
};