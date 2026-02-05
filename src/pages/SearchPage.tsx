import { useState } from 'react';
import '../App.css';
import { Header } from '../components/Header';
import { SearchSection } from '../components/SearchSection';
import { SearchResults } from '../components/SearchResults';
import { searchOfficers, searchVehicles, searchPublic } from '../services/searchService';
import type { SearchResult } from '../services/searchService';
import { motion, AnimatePresence } from 'framer-motion';

import { useAuth } from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';

export function SearchPage() {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const { userRole } = useAuth();
    const navigate = useNavigate();

    const handleSearch = async (section: string, query: string) => {
        const startTime = Date.now();
        console.log(`[SearchPage] Triggered ${section} search for query: "${query}"`);
        setIsSearching(true);
        setCurrentCategory(section);
        setShowResults(false); // Reset view before new search

        try {
            let data: SearchResult[] = [];

            if (section === 'OFFICERS') {
                data = await searchOfficers(query);
            } else if (section === 'VEHICLES') {
                data = await searchVehicles(query);
            } else if (section === 'PUBLIC') {
                data = await searchPublic(query);
            }

            const duration = Date.now() - startTime;
            console.log(`[SearchPage] ${section} Search completed in ${duration}ms. Results: ${data.length}`);

            setResults(data);
            setShowResults(true);
        } catch (error: any) {
            console.error(`[SearchPage] ${section} search failed:`, error);
            alert(`Search Failed: ${error.message || 'Unknown error'}. See console for details.`);
        } finally {
            setIsSearching(false);
        }
    };

    const handleViewAllData = () => {
        navigate('/admin-dashboard');
    };

    return (
        <div className="app-container">
            <div className="overlay"></div>

            <div className="content">
                <Header />

                {userRole === 'admin' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="admin-panel"
                        style={{
                            marginBottom: '2rem',
                            padding: '1rem',
                            border: '1px solid #FFD700',
                            background: 'rgba(255, 215, 0, 0.1)',
                            borderRadius: '8px',
                            textAlign: 'center',
                            width: '100%',
                            maxWidth: '800px'
                        }}
                    >
                        <h3 style={{ color: '#FFD700', fontFamily: 'Orbitron', marginTop: 0 }}>COMMAND CENTER ACCESS GRANTED</h3>
                        <p style={{ color: '#ccc' }}>Full Database Read Permissions Active</p>
                        <button
                            onClick={handleViewAllData}
                            style={{
                                background: 'transparent',
                                border: '1px solid #FFD700',
                                color: '#FFD700',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                fontFamily: 'Orbitron',
                                marginTop: '10px',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 215, 0, 0.2)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            VIEW ALL CLASSIFIED DATA
                        </button>
                    </motion.div>
                )}

                <main className="search-container">
                    <SearchSection
                        label="OFFICERS AND OR'S"
                        onSearch={(q) => handleSearch('OFFICERS', q)}
                        index={0}
                        isLoading={isSearching && currentCategory === 'OFFICERS'}
                    />

                    <SearchSection
                        label="ARMY VEHICLE'S"
                        onSearch={(q) => handleSearch('VEHICLES', q)}
                        index={1}
                        isLoading={isSearching && currentCategory === 'VEHICLES'}
                    />

                    <SearchSection
                        label="THE PUBLIC"
                        onSearch={(q) => handleSearch('PUBLIC', q)}
                        index={2}
                        isLoading={isSearching && currentCategory === 'PUBLIC'}
                    />
                </main>

                <AnimatePresence>
                    {showResults && (
                        <SearchResults
                            results={results}
                            category={currentCategory}
                            onClose={() => setShowResults(false)}
                        />
                    )}
                </AnimatePresence>

                <motion.footer
                    className="footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <p className="footer-text">SRI LANKA ARMY <span className="highlight">www.defence.lk</span></p>
                </motion.footer>
            </div>
        </div>
    );
}
