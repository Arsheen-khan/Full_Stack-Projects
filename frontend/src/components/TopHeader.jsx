import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopHeader.css';

const TopHeader = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const handleForward = () => {
        navigate(1);
    };

    return (
        <header className="top-header">
            <div className="nav-buttons">
                <button className="nav-btn" onClick={handleBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                </button>
                <button className="nav-btn" onClick={handleForward}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                </button>
            </div>
            <div className="header-actions">
                <button className="action-btn explore-btn">Explore Premium</button>
                <button className="action-btn install-btn">Install App</button>
            </div>
        </header>
    );
};

export default TopHeader;