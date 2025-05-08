import React from 'react';
import ProfilePostItem from './ProfilePostItem';

const ProfilePostList = ({ posts }) => {
    if (!posts || posts.length === 0) return null;
    return (
        <div className="mt-2">
            {posts.map(post => (
                <ProfilePostItem key={post.id} post={post} />
            ))}
        </div>
    );
};

export default ProfilePostList; 