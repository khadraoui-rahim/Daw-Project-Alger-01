import React from 'react';

const ProfileHeader = ({ onBack, onMenuClick, showMenu, children }) => (
    <div className="relative w-full">
        <div className="w-full flex items-center justify-between py-4 px-4 border-b border-gray-200">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center text-orange-500 font-bold text-lg bg-transparent border-none outline-none p-0 hover:bg-transparent focus:bg-transparent"
                style={{ background: 'none' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                BACK
            </button>
            {/* Title */}
            <div className="text-black font-bold text-xl tracking-wide uppercase">MY PROFILE</div>
            {/* Hamburger/Menu Icon */}
            <button
                onClick={onMenuClick}
                className="p-2 bg-transparent border-none outline-none focus:outline-none"
                style={{ background: 'none' }}
                aria-label="Menu"
            >
                <div className="space-y-2 w-8">
                    <div className="w-full h-0.5 bg-orange-500 rounded"></div>
                    <div className="w-full h-0.5 bg-orange-500 rounded"></div>
                    <div className="w-full h-0.5 bg-orange-500 rounded"></div>
                </div>
            </button>
        </div>
        {/* Dropdown Menu */}
        {showMenu && children}
    </div>
);

export default ProfileHeader; 