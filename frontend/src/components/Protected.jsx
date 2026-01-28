import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/useUser'

const Protected = ({ children }) => {
    const navigate = useNavigate();
    const { user, loading, setUser } = useUser();

    useEffect(() => {
        // If still loading, wait
        if (loading) return;

        // If user exists, allow access
        if (user) return;

        // If no user after loading, try to verify with backend
        const verifyAuth = async () => {
            try {
                const response = await fetch('http://localhost:3000/auth/me', {
                    credentials: 'include'
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    setUser({
                        username: userData.username,
                        email: userData.email,
                        id: userData._id || userData.id,
                    });
                } else {
                    // Backend auth failed
                    navigate('/login');
                }
            } catch (error) {
                console.error('Auth verification failed:', error);
                navigate('/login');
            }
        };

        verifyAuth();
    }, [user, loading, navigate, setUser])

    // Show nothing while loading to prevent flashing
    if (loading) {
        return <div></div>;
    }

    // If not authenticated, don't render children
    if (!user) {
        return null;
    }

    return children
}

export default Protected