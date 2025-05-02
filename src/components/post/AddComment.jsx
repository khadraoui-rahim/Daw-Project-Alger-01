import React, { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { ACTIONS } from '../../reducers/globalReducer';

const AddComment = ({ postId, onCommentAdded }) => {
    const [comment, setComment] = useState('');
    const { state, dispatch } = useGlobalContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!comment.trim()) return;

        // Dispatch action to add comment
        dispatch({
            type: ACTIONS.ADD_COMMENT,
            payload: {
                postId,
                comment: comment.trim()
            }
        });

        // Clear input
        setComment('');

        // Optional callback
        if (onCommentAdded) {
            onCommentAdded();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center mt-3 pb-2">
            <img
                src={state.currentUser?.avatar || 'https://via.placeholder.com/30'}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
            />
            <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 border rounded-full px-4 py-1 text-sm text-black focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
            />
            <button
                type="submit"
                className="ml-2 px-3 py-1 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 focus:outline-none"
                disabled={!comment.trim()}
            >
                Post
            </button>
        </form>
    );
};

export default AddComment; 