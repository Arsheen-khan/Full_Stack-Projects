import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    function handleRegister(event){
        event.preventDefault();
        setError('');
        setIsLoading(true);

        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim();

        // Basic validation
        if (!username || !password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        axios.post("http://localhost:3000/auth/register",{
            username,password
        },{
            withCredentials: true,
        }).then(response=>{
            console.log(response.data);
            setIsLoading(false);
            setIsSuccess(true);

            // Auto-redirect to login after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }).catch(error => {
            console.error('Registration error:', error);
            setIsLoading(false);
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
        });
    }
    
    return (
        <section className="register-section">

            <h1>Sound stream</h1>

            <div className="middle">

                <h1>create new account</h1>

                {/* Success Message */}
                {isSuccess && (
                    <div className="success-message">
                        <div className="success-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20,6 9,17 4,12"></polyline>
                            </svg>
                        </div>
                        <p>Registration successful!</p>
                        <span className="redirect-text">Redirecting to login...</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleRegister} action="">
                    <input
                        id="username"
                        type="text"
                        placeholder='Username'
                        disabled={isLoading || isSuccess}
                        required
                    />
                    <input
                        id="password"
                        type="password"
                        placeholder='Password'
                        disabled={isLoading || isSuccess}
                        required
                    />
                    <input
                        type="submit"
                        value={isLoading ? "Creating account..." : isSuccess ? "Account Created!" : "Register"}
                        disabled={isLoading || isSuccess}
                    />
                </form>

            </div>

            <p>already have an account ? <Link to="/login">Login</Link></p>

        </section>
    )
}

export default Register