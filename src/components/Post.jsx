import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { ACTIONS } from '../reducers/globalReducer';

const Post = ({ post }) => {
    const { state, dispatch } = useGlobalContext();
    const [comment, setComment] = useState('');

    const handleLike = () => {
        dispatch({ type: ACTIONS.LIKE_POST, payload: post.id });
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (comment.trim() && state.currentUser) {
            dispatch({
                type: ACTIONS.ADD_COMMENT,
                payload: {
                    postId: post.id,
                    comment: comment.trim(),
                },
            });
            setComment('');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center mb-4">
                <img
                    src={state.users.find(user => user.id === post.userId)?.avatar}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-semibold">
                    {state.users.find(user => user.id === post.userId)?.username}
                </span>
            </div>

            <img
                src={post.image}
                alt={post.caption}
                className="w-full rounded-lg mb-4"
            />

            <div className="mb-4">
                <p className="text-gray-800">{post.caption}</p>
            </div>

            <div className="flex items-center mb-4">
                <button
                    onClick={handleLike}
                    className="flex items-center text-gray-600 hover:text-red-500"
                >
                    <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    {post.likes} likes
                </button>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold mb-2">Comments:</h3>
                {post.comments.map(comment => (
                    <div key={comment.id} className="mb-2">
                        <span className="font-semibold">
                            {state.users.find(user => user.id === comment.userId)?.username}
                        </span>
                        <span className="ml-2">{comment.text}</span>
                    </div>
                ))}
            </div>

            {state.currentUser && (
                <form onSubmit={handleAddComment} className="flex">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                    >
                        Post
                    </button>
                </form>
            )}
        </div>
    );
};

export default Post; 