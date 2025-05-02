import React, { useState } from 'react';
import LikeHoverCard from './LikeHoverCard';
import AnimatedHeart from './AnimatedHeart';
import { useGlobalContext } from '../../context/GlobalContext';

const LikeCommentBar = ({ post, currentUser, onLike, onComment }) => {
    const { state } = useGlobalContext();
    const [showLikeHover, setShowLikeHover] = useState(false);

    // Add null checks to prevent errors
    if (!post) {
        return null; // Don't render anything if post is undefined
    }

    // Check if current user liked this post with null checks
    const isLiked = post.likedBy && currentUser && post.likedBy.includes(currentUser.id);

    // Get the number of likes with default value
    const likesCount = post.likes || 0;

    // Check if current user is in the likedBy array
    const userLiked = isLiked;

    return (
        <div className="py-2 border-b border-gray-200">
            <div className="flex items-center">
                <div className="relative mr-6"
                    onMouseEnter={() => setShowLikeHover(true)}
                    onMouseLeave={() => setShowLikeHover(false)}
                >
                    <AnimatedHeart
                        isLiked={isLiked}
                        onClick={onLike}
                        likesCount={likesCount}
                    />

                    {/* Hover card for likes */}
                    <LikeHoverCard
                        likedBy={post.likedBy}
                        users={state.users}
                        isVisible={showLikeHover && post.likedBy && post.likedBy.length > 0}
                    />
                </div>

                <button
                    onClick={onComment}
                    className="flex items-center focus:outline-none bg-transparent"
                    aria-label="Comment"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-black"
                    >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span className="ml-1 text-black">Comment</span>
                </button>
            </div>

            {likesCount > 0 && (
                <div className="mt-2 text-sm text-left">
                    <span className="font-medium">
                        {userLiked
                            ? likesCount > 1
                                ? `Liked by you and ${likesCount - 1} ${likesCount === 2 ? 'other' : 'others'}`
                                : 'Liked by you'
                            : `${likesCount} ${likesCount === 1 ? 'like' : 'likes'}`
                        }
                    </span>
                </div>
            )}
        </div>
    );
};

export default LikeCommentBar; 