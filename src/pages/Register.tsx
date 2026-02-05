import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';
import '../App.css';

export const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [serviceNumber, setServiceNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setError('');
        setLoading(true);
        let photoURL = '';

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Upload photo if selected
            if (imageFile) {
                const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
                await uploadBytes(storageRef, imageFile);
                photoURL = await getDownloadURL(storageRef);
            }

            // Create user document in Firestore
            const role = email === 'admin@army.lk' ? 'admin' : 'soldier';

            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                fullName,
                serviceNumber,
                role,
                photoURL,
                createdAt: new Date().toISOString()
            });

            navigate('/');
        } catch (err: unknown) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to create an account.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
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
                <h2 className="auth-title">SOLDIER REGISTRATION</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="auth-input"
                            placeholder="Rank & Name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Service Number</label>
                        <input
                            type="text"
                            value={serviceNumber}
                            onChange={(e) => setServiceNumber(e.target.value)}
                            required
                            className="auth-input"
                            placeholder="Enter Service Number"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="auth-input"
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
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="auth-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Profile Photo</label>
                        <div className="photo-upload-container" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px',
                            border: '1px dashed #FFD700',
                            borderRadius: '4px',
                            background: 'rgba(255,215,0,0.05)'
                        }}>
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFD700' }} />
                            ) : (
                                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFD700' }}>
                                    NO PHOTO
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="photo-upload"
                            />
                            <label htmlFor="photo-upload" className="auth-link" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>
                                SELECT PHOTO
                            </label>
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="auth-button">
                        {loading ? 'REGISTERING...' : 'REGISTER'}
                    </button>
                </form>
                <div className="auth-footer">
                    Already have an account? <Link to="/login" className="auth-link">Login</Link>
                </div>
            </motion.div>
        </div>
    );
};
