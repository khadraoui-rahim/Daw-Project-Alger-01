import React from 'react';

const PostCaption = ({ caption, username }) => {
    // If no caption, don't render anything
    if (!caption) return null;

    return (
        <div className="px-4 py-2 text-gray-600">
            {username && (
                <span className="font-medium text-gray-800 mr-2">{username}</span>
            )}
            <span>{caption}</span>
        </div>
    );
};

export default PostCaption; 