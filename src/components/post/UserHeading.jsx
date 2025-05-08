import React from 'react';

const UserHeading = ({ user, date, size = "medium", hideDate = false, noMargin = false, center = false }) => {
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

    // Check if avatar is a relative path and return placeholder if it is
    const getValidAvatarUrl = (avatarUrl) => {
        if (!avatarUrl) return null;

        // Check if it's a relative path that starts with 'src/' or './'
        if (avatarUrl.startsWith('src/') || avatarUrl.startsWith('./')) {
            // Return a placeholder image URL 
            return 'https://via.placeholder.com/150';
        }

        // Otherwise return the original URL
        return avatarUrl;
    };

    return (
        <div className={`flex ${center ? 'flex-col' : ''} items-center ${noMargin ? '' : 'mb-2'}`}>
            <div className={`${avatarSizes[size]} rounded-full border border-black overflow-hidden shadow-md bg-gray-200 flex-shrink-0`}>
                {user.avatar ? (
                    <img src={getValidAvatarUrl(user.avatar)} alt={user.username} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                        <span className="font-bold text-gray-600">{(user.username || 'U').charAt(0).toUpperCase()}</span>
                    </div>
                )}
            </div>
            <div className={`${center ? 'mt-2 text-center' : 'ml-3 text-left'}`}>
                <h4 className={`font-bold ${nameSizes[size]} text-black uppercase`}>{user.username || 'Unknown User'}</h4>
                {date && !hideDate && <p className={`${textSizes[size]} text-gray-500`}>{date}</p>}
            </div>
        </div>
    );
};

export default UserHeading; 