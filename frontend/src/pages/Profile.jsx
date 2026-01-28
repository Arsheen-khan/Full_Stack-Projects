import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import TopHeader from '../components/TopHeader';
import { useUser } from '../context/useUser';
import './Profile.css';
import { gsap } from 'gsap';
import axios from 'axios';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const contentRef = useRef(null);
    const navigate = useNavigate();
    const { user, logout } = useUser();
    const [uploadedCount, setUploadedCount] = useState(0);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        // Fetch uploaded songs count
        axios.get('http://localhost:3000/songs/get-songs', { withCredentials: true })
            .then(response => {
                if (response.data.songs) {
                    setUploadedCount(response.data.songs.length);
                }
            })
            .catch(() => setUploadedCount(0))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        // Page load animation
        if (contentRef.current) {
            const tl = gsap.timeline();
            tl.fromTo(contentRef.current, 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            );
        }
    }, [user]);

    return (
        <div className="app-layout">
            <Navigation />
            <TopHeader />
            <main className="main-content" ref={contentRef}>
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading profile...</p>
                    </div>
                ) : user ? (
                    <section className="profile-section">
                        {/* Profile Header */}
                        <div className="profile-hero">
                            <div className="profile-avatar-container">
                                <div className="profile-avatar">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                            </div>
                            <div className="profile-details">
                                <p className="profile-label">Profile</p>
                                <h1 className="profile-name">{user.username || 'User'}</h1>
                                <p className="profile-email">{user.email || 'No email'}</p>
                                <p className="profile-member">Member since</p>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="profile-stats-section">
                            <h2>Your Stats</h2>
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                    </div>
                                    <div className="stat-info">
                                        <p className="stat-value">0</p>
                                        <p className="stat-label">Liked Songs</p>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2v20M2 12h20"></path>
                                        </svg>
                                    </div>
                                    <div className="stat-info">
                                        <p className="stat-value">{uploadedCount}</p>
                                        <p className="stat-label">Uploaded Songs</p>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"></path>
                                        </svg>
                                    </div>
                                    <div className="stat-info">
                                        <p className="stat-value">0</p>
                                        <p className="stat-label">Playlists</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Info Card */}
                        <div className="account-info-section">
                            <h2>Account Information</h2>
                            <div className="info-card">
                                <div className="info-row">
                                    <span className="info-label">Username</span>
                                    <span className="info-value">{user.username || 'N/A'}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Email</span>
                                    <span className="info-value">{user.email || 'N/A'}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Account Type</span>
                                    <span className="info-value">Premium</span>
                                </div>
                            </div>
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    </section>
                ) : (
                    <div className="error-container">
                        <p>Unable to load profile</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Profile;