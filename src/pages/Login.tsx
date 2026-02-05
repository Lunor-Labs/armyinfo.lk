import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { motion } from 'framer-motion';
import '../App.css'; // Re-use main styles for now

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Allow login with just username (e.g. "admin") -> "admin@army.lk"
            // This is a convenience feature.
            let loginEmail = email;
            if (!email.includes('@')) {
                loginEmail = `${email}@army.lk`;
            }

            await signInWithEmailAndPassword(auth, loginEmail, password);
            navigate('/');
        } catch (err: unknown) {
            console.error(err);
            setError('Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <motion.div
                className="auth-box"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="auth-title">MILITARY SIU LOGIN</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Username / Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="auth-input"
                            placeholder="Enter username or email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="auth-input"
                            placeholder="Enter password"
                        />
                    </div>
                    <button type="submit" disabled={loading} className="auth-button">
                        {loading ? 'LOGGING IN...' : 'LOGIN'}
                    </button>
                </form>
                <div className="auth-footer">
                    Need an account? <Link to="/register" className="auth-link">Register Soldier</Link>
                </div>
            </motion.div>
        </div>
    );
};
