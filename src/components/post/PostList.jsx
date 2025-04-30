import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import Post from './Post';

const PostList = () => {
    const { state } = useGlobalContext();

    // Check if posts exist
    if (!state || !state.posts || !Array.isArray(state.posts) || state.posts.length === 0) {
        return (
            <div className="mt-4 text-center">
                <p className="text-gray-500">No posts found.</p>
            </div>
        );
    }

    // Sort posts by timestamp (most recent first)
    const sortedPosts = [...state.posts].sort((a, b) => {
        // Handle missing timestamps
        if (!a.timestamp) return 1;
        if (!b.timestamp) return -1;
        return new Date(b.timestamp) - new Date(a.timestamp);
    });

    return (
        <div className="mt-4">
            {sortedPosts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList; 