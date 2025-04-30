import React from 'react';

const PostImage = ({ image }) => {
    return (
        <div className="w-full mb-3">
            <img
                src={image}
                alt="Post image"
                className="w-full h-auto object-cover"
            />
        </div>
    );
};

export default PostImage; 