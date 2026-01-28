import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
const UserContext = createContext(null);

// UserProvider component
export const UserProvider = ({ children }) => {
    const [user, setUserState] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize user from localStorage on app load
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                setUserState(userData);
            }
        } catch (error) {
            console.error('Error loading user from localStorage:', error);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }, []);

    // setUser function that updates both state and localStorage
    const setUser = (userData) => {
        if (userData) {
            setUserState(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            setUserState(null);
            localStorage.removeItem('user');
        }
    };

    // logout function
    const logout = () => {
        setUserState(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        setUser,
        logout,
        loading,
        isAuthenticated: user !== null,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
