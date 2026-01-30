import React, { useState } from 'react';
import './SearchSection.css';
import { motion } from 'framer-motion';

interface SearchSectionProps {
    label: string;
    onSearch: (query: string) => void;
    index: number; // For staggered animation
    isLoading?: boolean;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ label, onSearch, index, isLoading = false }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <motion.div
            className="search-row"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
        >
            <div className="label-container">
                <motion.div
                    className="search-label"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                >
                    {label}
                </motion.div>
            </div>
            <div className={`input-group glass-panel ${isFocused ? 'focused' : ''}`}>
                <input
                    type="text"
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="ENTER DETAILS..."
                />
                <motion.button
                    className="search-button"
                    onClick={handleSearch}
                    disabled={isLoading}
                    whileHover={isLoading ? {} : { scale: 1.02 }}
                    whileTap={isLoading ? {} : { scale: 0.98 }}
                    style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                >
                    {isLoading ? 'Scanning...' : 'SEARCH'}
                </motion.button>
            </div>
        </motion.div>
    );
};
