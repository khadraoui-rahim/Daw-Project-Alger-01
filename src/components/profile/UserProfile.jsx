import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { ACTIONS } from '../../reducers/globalReducer';

const UserProfile = () => {
    const { state, dispatch } = useGlobalContext();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const navigate = useNavigate();

    const user = state.currentUser;

    if (!user) {
        return <div>No user logged in</div>;
    }

    // Count user posts
    const userPosts = state.posts.filter(post => post.userId === user.id);

    // Count user comments
    const userCommentCount = state.posts.reduce((total, post) => {
        const postComments = post.comments.filter(comment => comment.userId === user.id).length;
        return total + postComments;
    }, 0);

    const handleDeleteAccount = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDeleteAccount = () => {
        // Dispatch the delete user action
        dispatch({ type: ACTIONS.DELETE_USER, payload: user.id });
        // Navigate to login page
        navigate('/');
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="bg-orange-500 text-white py-6 px-4 flex items-center">
                <div
                    className="flex items-center"
                    onClick={() => navigate('/home')}
                    style={{ cursor: 'pointer' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="ml-1">Back</span>
                </div>
                <h1 className="text-xl font-bold flex-1 text-center">My Profile</h1>
                <div className="w-16"></div> {/* Spacer for centering */}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="bg-white rounded-lg shadow-md p-6 -mt-3">
                    <div className="flex items-center mb-6">
                        <img
                            src={user.avatar}
                            alt={user.username}
                            className="w-24 h-24 rounded-full object-cover mr-6"
                        />
                        <div>
                            <h1 className="text-2xl font-bold">{user.username}</h1>
                            <p className="text-gray-500">User ID: {user.id}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <h3 className="text-lg font-semibold">{userPosts.length}</h3>
                            <p className="text-gray-600">Posts</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <h3 className="text-lg font-semibold">{userCommentCount}</h3>
                            <p className="text-gray-600">Comments</p>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h2 className="text-xl font-bold mb-4">Account Settings</h2>

                        <div className="mt-4">
                            <button
                                onClick={handleDeleteAccount}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors w-full"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>

                {/* Delete confirmation modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Delete Account</h2>
                            <p className="mb-6">
                                Are you sure you want to delete your account? This will:
                                <ul className="list-disc pl-5 mt-2">
                                    <li>Delete all your posts</li>
                                    <li>Delete all your comments</li>
                                    <li>Remove your likes from posts</li>
                                    <li>Permanently delete your account</li>
                                </ul>
                                This action cannot be undone.
                            </p>
                            <div className="flex space-x-4">
                                <button
                                    onClick={cancelDelete}
                                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeleteAccount}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex-1"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile; 