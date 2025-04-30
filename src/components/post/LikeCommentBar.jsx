import React from 'react';

const LikeCommentBar = ({ post, currentUser, onLike, onComment }) => {
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
                <button
                    onClick={onLike}
                    className="flex items-center mr-6 focus:outline-none bg-transparent"
                    aria-label="Like"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={isLiked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-6 w-6 ${isLiked ? 'text-red-500' : 'text-black'}`}
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span className="ml-1 text-black">Like</span>
                    <span className="ml-1 text-black font-medium">({likesCount})</span>
                </button>

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