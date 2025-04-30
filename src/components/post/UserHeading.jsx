import React from 'react';

const UserHeading = ({ user, date, size = "medium" }) => {
    // Fallback if user is undefined or null
    if (!user) {
        user = {
            username: 'Unknown User',
            avatar: null
        };
    }

    const avatarSizes = {
        small: "h-8 w-8",
        medium: "h-12 w-12",
        large: "h-16 w-16",
    };

    const textSizes = {
        small: "text-xs",
        medium: "text-sm",
        large: "text-base",
    };

    const nameSizes = {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
    };

    return (
        <div className="flex items-center mb-2">
            <div className={`${avatarSizes[size]} rounded-full border border-black overflow-hidden shadow-md bg-gray-200 flex-shrink-0`}>
                {user.avatar ? (
                    <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                        <span className="font-bold text-gray-600">{(user.username || 'U').charAt(0).toUpperCase()}</span>
                    </div>
                )}
            </div>
            <div className="ml-3 text-left">
                <h4 className={`font-bold ${nameSizes[size]} text-black uppercase`}>{user.username || 'Unknown User'}</h4>
                {date && <p className={`${textSizes[size]} text-gray-500`}>{date}</p>}
            </div>
        </div>
    );
};

export default UserHeading; 