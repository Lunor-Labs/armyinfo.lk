import React, { useEffect, useState } from 'react';
import { getAllOfficers, getAllVehicles, getAllPublic, addRecord, updateRecord, deleteRecord } from '../services/searchService';
import type { SearchResult } from '../services/searchService';
import { Header } from '../components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';

const COLLECTION_MAP = {
    'OFFICERS': 'officers',
    'VEHICLES': 'vehicles',
    'PUBLIC': 'public'
};

const FIELDS_MAP = {
    'OFFICERS': ['serviceNumber', 'rank', 'name', 'unit', 'status'],
    'VEHICLES': ['plateNumber', 'type', 'owner', 'chassisNumber', 'status'],
    'PUBLIC': ['nic', 'name', 'address', 'phone', 'records']
};

export const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'OFFICERS' | 'VEHICLES' | 'PUBLIC'>('OFFICERS');
    const [data, setData] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<SearchResult | null>(null);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        fetchData(activeTab);
    }, [activeTab]);

    const fetchData = async (tab: 'OFFICERS' | 'VEHICLES' | 'PUBLIC') => {
        setLoading(true);
        try {
            let result: SearchResult[] = [];
            if (tab === 'OFFICERS') result = await getAllOfficers();
            else if (tab === 'VEHICLES') result = await getAllVehicles();
            else if (tab === 'PUBLIC') result = await getAllPublic();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddClick = () => {
        setEditingItem(null);
        setFormData({});
        setIsModalOpen(true);
    };

    const handleEditClick = (item: SearchResult) => {
        setEditingItem(item);
        setFormData(item);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this record? This action is irreversible.")) {
            try {
                await deleteRecord(COLLECTION_MAP[activeTab], id);
                fetchData(activeTab);
            } catch (error) {
                alert("Error deleting record");
            }
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem) {
                const { id, ...updateData } = formData;
                await updateRecord(COLLECTION_MAP[activeTab], editingItem.id, updateData);
            } else {
                await addRecord(COLLECTION_MAP[activeTab], formData);
            }
            setIsModalOpen(false);
            fetchData(activeTab);
        } catch (error) {
            alert("Error saving record");
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <div className="app-container">
            <div className="overlay"></div>
            <div className="content">
                <Header />

                <div className="dashboard-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 style={{
                        color: '#FFD700',
                        fontFamily: 'Black Ops One',
                        margin: 0,
                        fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                        textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
                    }}>COMMAND CENTER DATABASE</h2>
                    <button
                        onClick={handleAddClick}
                        style={{
                            background: '#FFD700',
                            color: '#000',
                            border: 'none',
                            padding: '12px 24px',
                            fontFamily: 'Orbitron',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)',
                            transition: 'all 0.3s ease'
                        }}
                        className="add-record-btn"
                    >
                        + ADD NEW RECORD
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    {['OFFICERS', 'VEHICLES', 'PUBLIC'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            style={{
                                background: activeTab === tab ? '#FFD700' : 'rgba(0,0,0,0.5)',
                                color: activeTab === tab ? '#000' : '#fff',
                                border: '1px solid #FFD700',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                fontFamily: 'Orbitron',
                                fontWeight: 'bold',
                                transition: 'all 0.3s'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ width: '100%', background: 'rgba(0,0,0,0.8)', padding: '20px', borderRadius: '8px', border: '1px solid #FFD700', boxShadow: '0 0 20px rgba(255, 215, 0, 0.1)' }}
                >
                    {loading ? (
                        <div style={{ color: '#FFD700', textAlign: 'center', padding: '20px', fontFamily: 'Orbitron' }}>DECRYPTING CLASSIFIED DATA...</div>
                    ) : data.length === 0 ? (
                        <div style={{ color: '#aaa', textAlign: 'center', padding: '20px' }}>No records found in current sector.</div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ccc' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #FFD700', textAlign: 'left' }}>
                                        {FIELDS_MAP[activeTab].map(field => (
                                            <th key={field} style={{ padding: '12px', color: '#FFD700', textTransform: 'uppercase', fontSize: '0.8rem', fontFamily: 'Orbitron' }}>{field}</th>
                                        ))}
                                        <th style={{ padding: '12px', color: '#FFD700', textAlign: 'right', fontFamily: 'Orbitron' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id} style={{ borderBottom: '1px solid #333', transition: 'background 0.2s' }} className="table-row-hover">
                                            {FIELDS_MAP[activeTab].map(field => (
                                                <td key={field} style={{ padding: '12px', fontSize: '0.9rem' }}>{item[field] || 'N/A'}</td>
                                            ))}
                                            <td style={{ padding: '12px', textAlign: 'right' }}>
                                                <button onClick={() => handleEditClick(item)} style={{ background: 'transparent', border: '1px solid #00ff00', color: '#00ff00', padding: '4px 8px', marginRight: '8px', cursor: 'pointer', fontSize: '0.7rem', fontFamily: 'Orbitron' }}>EDIT</button>
                                                <button onClick={() => handleDeleteClick(item.id)} style={{ background: 'transparent', border: '1px solid #ff0000', color: '#ff0000', padding: '4px 8px', cursor: 'pointer', fontSize: '0.7rem', fontFamily: 'Orbitron' }}>DELETE</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>

                {/* CRUD Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.9)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 1000,
                                padding: '20px'
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                style={{
                                    background: '#1a1a1a',
                                    border: '1px solid #FFD700',
                                    padding: '30px',
                                    width: '100%',
                                    maxWidth: '500px',
                                    borderRadius: '8px',
                                    position: 'relative'
                                }}
                            >
                                <h3 style={{ color: '#FFD700', fontFamily: 'Orbitron', marginTop: 0, marginBottom: '20px' }}>
                                    {editingItem ? 'EDIT RECORD' : 'ADD NEW RECORD'}
                                </h3>
                                <form onSubmit={handleFormSubmit}>
                                    {FIELDS_MAP[activeTab].map(field => (
                                        <div key={field} style={{ marginBottom: '15px' }}>
                                            <label style={{ color: '#FFD700', display: 'block', marginBottom: '5px', fontSize: '0.8rem', fontFamily: 'Orbitron' }}>
                                                {field.toUpperCase()}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData[field] || ''}
                                                onChange={(e) => handleInputChange(field, e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid #444',
                                                    color: '#fff',
                                                    padding: '10px',
                                                    borderRadius: '4px',
                                                    fontFamily: 'monospace'
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                        <button
                                            type="submit"
                                            style={{
                                                flex: 1,
                                                background: '#FFD700',
                                                color: '#000',
                                                border: 'none',
                                                padding: '12px',
                                                fontFamily: 'Orbitron',
                                                fontWeight: 'bold',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {editingItem ? 'UPDATE' : 'CREATE'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            style={{
                                                flex: 1,
                                                background: 'transparent',
                                                color: '#fff',
                                                border: '1px solid #444',
                                                padding: '12px',
                                                fontFamily: 'Orbitron',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            CANCEL
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <style>{`
                .table-row-hover:hover {
                    background: rgba(255, 215, 0, 0.05);
                }
                .add-record-btn:hover {
                    transform: translateY(-2px);
                    boxShadow: 0 0 20px rgba(255, 215, 0, 0.6);
                }
                @media (max-width: 768px) {
                    .dashboard-header {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
};
