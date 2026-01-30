import React from 'react';
import './Header.css';
import logoArmy from '../assets/logo_army.jpg';
import logoUnit from '../assets/logo_unit.jpg';
import { motion } from 'framer-motion';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <>
      {currentUser && (
        <div className="header-auth-wrapper">
          <div className="auth-controls">
            <span className="user-badge">
              {userRole || 'USER'}
            </span>
            <div style={{ display: 'flex', gap: '10px' }}>
              {userRole === 'admin' && (
                <button
                  className="logout-button"
                  onClick={() => navigate(window.location.pathname === '/admin-dashboard' ? '/' : '/admin-dashboard')}
                  style={{ background: '#FFD700', color: '#000', borderColor: '#FFD700' }}
                >
                  {window.location.pathname === '/admin-dashboard' ? 'SEARCH' : 'ADMIN PORTAL'}
                </button>
              )}
              <button className="logout-button" onClick={handleLogout}>
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}
      <header className="header-container">
        <motion.div
          className="logo-section left"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <img src={logoArmy} alt="Sri Lanka Army Logo" className="logo" />
        </motion.div>

        <motion.div
          className="title-section"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="main-title">SRI LANKA ARMY</h1>
          <h2 className="sub-title">SPECIAL INVESTIGATION UNIT</h2>
          <motion.div
            className="divider"
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ delay: 1, duration: 1 }}
          ></motion.div>
          <h3 className="brigade-title">582 INFANTRY BRIGADE</h3>
        </motion.div>

        <motion.div
          className="logo-section right"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <img src={logoUnit} alt="Unit Logo" className="logo" />
        </motion.div>
      </header>
    </>
  );
};
