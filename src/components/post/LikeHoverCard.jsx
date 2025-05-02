import React from 'react';
import UserHeading from './UserHeading';

const LikeHoverCard = ({ likedBy, users, isVisible }) => {
    // If the card shouldn't be visible or there are no likes, don't render anything
    if (!isVisible || !likedBy || likedBy.length === 0) {
        return null;
    }

    // Get the users who liked the post (maximum of 5 to show)
    const likedByUsers = likedBy
        .map(userId => users.find(user => user.id === userId))
        .filter(user => user) // Filter out any undefined users
        .slice(0, 5); // Show maximum 5 users

    return (
        <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-2 min-w-[200px] z-10">
            {likedByUsers.map(user => (
                <div key={user.id} className="py-1">
                    <div className="flex items-start">
                        <UserHeading user={user} size="small" />
                        <span className="text-xs text-gray-500 ml-1 mt-2">has liked</span>
                    </div>
                </div>
            ))}
            {likedBy.length > 5 && (
                <div className="text-xs text-gray-500 mt-1 pl-2">
                    And {likedBy.length - 5} more...
                </div>
            )}
        </div>
    );
};

export default LikeHoverCard; 