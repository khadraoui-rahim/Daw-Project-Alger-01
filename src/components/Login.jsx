import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { ACTIONS } from '../reducers/globalReducer';

const Login = () => {
    const { state, dispatch } = useGlobalContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Check if avatar is a relative path and return placeholder if it is
    const getValidAvatarUrl = (avatarUrl) => {
        if (!avatarUrl) return 'https://via.placeholder.com/150';

        // Check if it's a relative path that starts with 'src/' or './'
        if (avatarUrl.startsWith('src/') || avatarUrl.startsWith('./')) {
            // Return a placeholder image URL 
            return 'https://via.placeholder.com/150';
        }

        // Otherwise return the original URL
        return avatarUrl;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const user = state.users.find(
            u => u.username === username && u.password === password
        );

        if (user) {
            dispatch({ type: ACTIONS.LOGIN, payload: user });
            setError('');
        } else {
            setError('Invalid username or password');
        }
    };

    const handleLogout = () => {
        dispatch({ type: ACTIONS.LOGOUT });
    };

    if (state.currentUser) {
        return (
            <div className="flex items-center">
                <img
                    src={getValidAvatarUrl(state.currentUser.avatar)}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full mr-2"
                />
                <span className="mr-4">{state.currentUser.username}</span>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <div>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full px-4 py-2 border rounded focus:outline-none"
                />
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded focus:outline-none"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Login
            </button>
        </form>
    );
};

export default Login; 