import React, { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { ACTIONS } from '../../reducers/globalReducer';
import UserHeading from './UserHeading';

const PostComment = ({ comment, user, postId }) => {
    const { state, dispatch } = useGlobalContext();
    const [isHovered, setIsHovered] = useState(false);

    // Check if the comment is by the current user
    const isOwnComment = state.currentUser && state.currentUser.id === comment.userId;

    // Format the date for display
    const formattedDate = comment.timestamp ?
        new Date(comment.timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }) : '';

    const handleDeleteComment = () => {
        dispatch({
            type: ACTIONS.DELETE_COMMENT,
            payload: {
                postId: postId,
                commentId: comment.id
            }
        });
    };

    return (
        <div
            className="mb-3 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <UserHeading user={user} date={formattedDate} size="small" />
            <div className="pl-11 -mt-1 text-left">
                <p className="text-gray-900">{comment.text}</p>
            </div>

            {/* Delete button - visible only when hovered and it's the user's own comment */}
            {isHovered && isOwnComment && (
                <button
                    onClick={handleDeleteComment}
                    className="absolute top-0 right-0 text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors"
                    aria-label="Delete comment"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default PostComment; 