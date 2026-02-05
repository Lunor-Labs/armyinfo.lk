import React from 'react';
import { motion } from 'framer-motion';
import type { SearchResult } from '../services/searchService';
import './SearchResults.css';

interface SearchResultsProps {
    results: SearchResult[];
    category: string;
    onClose: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, category, onClose }) => {
    return (
        <motion.div
            className="results-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="results-container glass-panel"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div className="results-header">
                    <h3>SEARCH RESULTS - {category}</h3>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                <div className="results-list">
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <div key={result.id} className="result-item">
                                <div className="result-index">#{index + 1}</div>
                                <div className="result-details">
                                    {Object.entries(result).map(([key, value]) => {
                                        if (key === 'id') return null;
                                        return (
                                            <div key={key} className="result-field">
                                                <span className="field-label">{key.toUpperCase()}:</span>
                                                <span className="field-value">{String(value)}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <i className="fas fa-exclamation-triangle" style={{ fontSize: '2rem', color: '#FFD700', marginBottom: '1rem' }}></i>
                            <p style={{ color: '#FFD700', fontFamily: 'Orbitron' }}>NO CLASSIFIED RECORDS MATCHED THE QUERY</p>
                            <p style={{ color: '#888', fontSize: '0.9rem' }}>Check query uppercase format and case sensitivity.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};
