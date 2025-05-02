import React from 'react';

const PostCaption = ({ caption }) => {
    // If no caption, don't render anything
    if (!caption) return null;

    return (
        <div className="p-0 text-gray-600 text-left">
            <span>{caption}</span>
        </div>
    );
};

export default PostCaption; 