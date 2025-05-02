import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { ACTIONS } from '../../reducers/globalReducer';
import UserHeading from './UserHeading';
import PostImage from './PostImage';
import PostCaption from './PostCaption';
import LikeCommentBar from './LikeCommentBar';
import PostComments from './PostComments';
import AddComment from './AddComment';

const Post = ({ post }) => {
    const { state, dispatch } = useGlobalContext();
    const [showAllComments, setShowAllComments] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [animated, setAnimated] = useState(false);

    // Set loaded to true after component mounts to trigger animations
    useEffect(() => {
        // Small delay to ensure rendering is complete before animation
        const timeoutId = setTimeout(() => {
            setLoaded(true);

            // Mark animation as complete after animation finishes
            const animationTimeout = setTimeout(() => {
                setAnimated(true);
            }, 800); // Slightly longer than animation duration

            return () => clearTimeout(animationTimeout);
        }, 50);

        return () => clearTimeout(timeoutId);
    }, []);

    // Error boundary - return null if post is undefined or missing critical data
    if (!post || !post.userId) {
        return null;
    }

    // Find the user who created this post
    const postUser = state.users.find(user => user.id === post.userId) || {
        username: 'Unknown User',
        avatar: null
    };

    // Format the date for display with fallback for missing timestamp
    const formattedDate = post.timestamp ?
        new Date(post.timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }) : '';

    const handleLike = () => {
        // Only dispatch if current user exists
        if (state.currentUser) {
            dispatch({
                type: ACTIONS.LIKE_POST,
                payload: post.id
            });
        }
    };

    const toggleComments = () => {
        setShowAllComments(!showAllComments);
    };

    const handleCommentClick = () => {
        setShowAddComment(!showAddComment);
        // If we're showing the add comment form, also show all comments
        if (!showAddComment) {
            setShowAllComments(true);
        }
    };

    const handleCommentAdded = () => {
        // Ensure comments are visible after adding a new one
        setShowAllComments(true);
    };

    // Apply animation classes only if not yet animated
    // This prevents re-triggering animations when scrolling back up
    const animationClass = !animated ? (loaded ? 'animate-collapseDown' : 'opacity-0') : '';

    return (
        <div className={`bg-gray-100 rounded-lg overflow-hidden shadow-sm mb-5 ${animationClass}`}>
            <div className={`p-4 bg-white transition-opacity duration-500 ${loaded ? 'opacity-100 delay-100' : 'opacity-0'}`}>
                {/* User info who posted */}
                <UserHeading user={postUser} date={formattedDate} />

                {/* Post caption */}
                <PostCaption caption={post.caption} />
            </div>

            {/* Post image */}
            <div className={`transition-opacity duration-500 ${loaded ? 'opacity-100 delay-200' : 'opacity-0'}`}>
                <PostImage image={post.image} />
            </div>

            <div className={`px-4 pb-3 bg-white transition-opacity duration-500 ${loaded ? 'opacity-100 delay-300' : 'opacity-0'}`}>
                {/* Like and comment buttons */}
                <LikeCommentBar
                    post={post}
                    currentUser={state.currentUser}
                    onLike={handleLike}
                    onComment={handleCommentClick}
                />

                {/* Add Comment form */}
                {showAddComment && state.currentUser && (
                    <AddComment
                        postId={post.id}
                        onCommentAdded={handleCommentAdded}
                    />
                )}

                {/* Comments section */}
                {post.comments && post.comments.length > 0 && (
                    <PostComments
                        comments={post.comments}
                        users={state.users}
                        showAllComments={showAllComments}
                        toggleComments={toggleComments}
                    />
                )}
            </div>
        </div>
    );
};

export default Post; 