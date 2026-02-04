import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../context/GlobalContext';
import { ACTIONS } from '../../reducers/globalReducer';
import './LoginScreen.css';
import rabbitLogo from '../../assets/images/rabbit.png';

const LoginScreen = ({ onBack, onLoginSuccess }) => {
    const { state, dispatch } = useGlobalContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const user = state.users.find(
            u => u.username === username && u.password === password
        );

        if (user) {
            dispatch({ type: ACTIONS.LOGIN, payload: user });
            setError('');
            // Notify parent component of successful login
            onLoginSuccess();
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <motion.div 
            className="login-split-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Background image with overlay */}
            <div
                className="login-right-bg"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
            ></div>

            {/* Centered Login Card */}
            <motion.div 
                className="login-left-panel"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {/* Back Button */}
                <div className="back-button" onClick={onBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="back-text font-poppins">Back</span>
                </div>

                {/* Logo */}
                <div className="login-logo-wrapper">
                    <img src={rabbitLogo} alt="Rabbit Logo" className="login-logo" />
                </div>

                {/* Title */}
                <h1 className="login-title font-poppins">Welcome Back</h1>
                <p className="login-subtitle font-poppins">Log in to continue your journey</p>

                {/* Error Message */}
                {error && <p className="error-message">{error}</p>}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <div className="input-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="input-field font-poppins"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="input-field font-poppins"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-button font-poppins">
                        <span>Log in</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </form>

                {/* Sign Up Link */}
                <div className="signup-link">
                    <p className="font-poppins">
                        Don't have an account? <span className="signup-text" onClick={() => onBack('signup')}>Sign up</span>
                    </p>
                </div>

                {/* Demo Info */}
                <div className="demo-info">
                    <p className="font-poppins">Demo credentials:</p>
                    <p className="font-poppins"><strong>Username:</strong> alex, david, jhon, mary, sara</p>
                    <p className="font-poppins"><strong>Password:</strong> 1234</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LoginScreen; 