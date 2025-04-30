import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { ACTIONS } from '../../reducers/globalReducer';
import rabbitLogo from '../../assets/images/rabbit.png';

const HomeScreen = () => {
    const { state, dispatch } = useGlobalContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        dispatch({ type: ACTIONS.LOGOUT });
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white py-3 px-4 border-b relative">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src={rabbitLogo}
                            alt="Rabbit Logo"
                            className="h-14 w-14 rounded-full object-cover shadow-sm"
                        />
                    </div>

                    {/* Sandwich Menu Button */}
                    <div ref={menuRef}>
                        <button
                            onClick={toggleMenu}
                            className="p-2 focus:outline-none bg-transparent"
                            aria-label="Menu"
                            style={{ background: 'none' }}
                        >
                            <div className="space-y-2 w-8">
                                <div className="w-full h-0.5 bg-orange-500 rounded"></div>
                                <div className="w-full h-0.5 bg-orange-500 rounded"></div>
                                <div className="w-full h-0.5 bg-orange-500 rounded"></div>
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {menuOpen && (
                            <div className="bg-white shadow-md absolute right-4 top-16 w-56 z-10 rounded-lg overflow-hidden border border-gray-100 animate-fadeIn">
                                <div className="py-1">
                                    <a href="#" className="block px-6 py-3 text-gray-800 hover:bg-orange-500 hover:text-white border-b border-gray-100">
                                        Home
                                    </a>
                                    <a href="#" className="block px-6 py-3 text-gray-800 hover:bg-orange-500 hover:text-white border-b border-gray-100">
                                        My Account
                                    </a>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLogout();
                                        }}
                                        className="block px-6 py-3 text-gray-800 hover:bg-orange-500 hover:text-white"
                                    >
                                        Logout
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Empty content area for future development */}
            <main className="container mx-auto p-4">
                <div className="bg-white rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {state.currentUser.username}!</h2>
                    <p className="text-gray-600">
                        This is a blank slate for you to build upon.
                    </p>
                </div>
            </main>
        </div>
    );
};

// Add this to your tailwind.config.js if needed for animation
// extend: {
//   animation: {
//     fadeIn: 'fadeIn 0.2s ease-in-out',
//   },
//   keyframes: {
//     fadeIn: {
//       '0%': { opacity: 0, transform: 'translateY(-10px)' },
//       '100%': { opacity: 1, transform: 'translateY(0)' },
//     },
//   },
// }

export default HomeScreen; 