import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../context/useUser'
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function handleLogin(event) {
        event.preventDefault()
        setError('');
        setLoading(true);

        const username = document.querySelector("#username").value
        const password = document.querySelector("#password").value

        if (!username || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        axios.post("http://localhost:3000/auth/login",
            {
                username, password
            },
            {
                withCredentials: true,
            }).then(response => {
                console.log("Login successful:", response.data)
                
                // Store user info in Context and localStorage
                const userData = {
                    username: response.data.username || username,
                    email: response.data.email || '',
                    id: response.data._id || response.data.id || '',
                };
                
                setUser(userData);
                setLoading(false);
                navigate("/")
            })
            .catch(error => {
                console.error("Login error:", error)
                setError(error.response?.data?.message || 'Login failed. Please try again.');
                setLoading(false);
            })
    }

    return (
        <section className="login-section">

            <h1>Sound stream</h1>

            <div className="middle">

                <h1>Welcome back</h1>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleLogin}>
                    <input id='username' type="text" placeholder='Username' required />
                    <input id='password' type="password" placeholder='Password' required />
                    <input type="submit" value={loading ? "Logging in..." : "Login"} disabled={loading} />
                </form>

            </div>

            <p>create an account <Link to="/register">register</Link></p>

        </section>
    )
}

export default Login