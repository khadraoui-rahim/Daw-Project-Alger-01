import React, { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { ACTIONS } from '../../reducers/globalReducer';

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
        <div className="flex flex-col min-h-screen">
            {/* Header - Extended height and padding to ensure no black showing */}
            <div className="bg-orange-500 text-white py-6 px-4 flex items-center">
                <div className="flex items-center" onClick={onBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="ml-1">Back</span>
                </div>
                <h1 className="text-xl font-bold flex-1 text-center">LOG IN</h1>
                <div className="w-16"></div> {/* Spacer for centering */}
            </div>

            {/* Main Content - Increased negative margin to overlap with header */}
            <div className="bg-white flex-1 p-5 rounded-t-3xl -mt-3">
                <h2 className="text-3xl font-bold mb-2">Welcome</h2>
                <p className="text-gray-600 mb-8">Choose an account to keep exploring amazing destinations around the world!</p>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4 relative">
                        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 border-2 border-transparent focus-within:border-orange-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="bg-transparent w-full focus:outline-none text-black placeholder-gray-500"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-8 relative">
                        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 border-2 border-transparent focus-within:border-orange-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="bg-transparent w-full focus:outline-none text-black placeholder-gray-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-4 px-4 rounded-full flex items-center justify-between"
                    >
                        <span className="font-bold">Log in</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account? <span className="text-orange-500 font-medium" onClick={() => onBack('signup')}>Sign up</span>
                    </p>
                </div>

                <div className="mt-16 text-center text-gray-700">
                    <p>As this is a Demo app here are the available users:</p>
                    <p>UserName:</p>
                    <p>alex, david, jhon, mary, sara</p>
                    <p>Password: 1234</p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen; 