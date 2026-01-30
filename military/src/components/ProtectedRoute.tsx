import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode, adminOnly?: boolean }> = ({ children, adminOnly }) => {
    const { currentUser, userRole, loading } = useAuth();

    if (loading) {
        return <div className="loading-screen" style={{ color: '#fff', textAlign: 'center', marginTop: '20%' }}>Loading authentication...</div>;
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && userRole !== 'admin') {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};
