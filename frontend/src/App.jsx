import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CarListPage from './pages/CarListPage';
import CarFormPage from './pages/CarFormPage';
import CarDetailPage from './pages/CarDetailPage';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Navigate to="/cars" replace /> : children;
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<PublicRoute><AuthPage isLogin={true} /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><AuthPage isLogin={false} /></PublicRoute>} />
            <Route path="/cars" element={<PrivateRoute><CarListPage /></PrivateRoute>} />
            <Route path="/cars/create" element={<PrivateRoute><CarFormPage /></PrivateRoute>} />
            <Route path="/cars/:id/edit" element={<PrivateRoute><CarFormPage /></PrivateRoute>} />
            <Route path="/cars/:id" element={<PrivateRoute><CarDetailPage /></PrivateRoute>} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}