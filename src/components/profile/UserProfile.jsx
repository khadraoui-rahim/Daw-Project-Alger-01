import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { ACTIONS } from '../../reducers/globalReducer';
import ProfileHeader from './ProfileHeader';
import ProfileUserInfo from './ProfileUserInfo';
import ProfilePostList from './ProfilePostList';

const UserProfile = () => {
    const { state, dispatch } = useGlobalContext();
    const navigate = useNavigate();
    const user = state.currentUser;
    const [menuOpen, setMenuOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    if (!user) return <div>No user logged in</div>;
    const userPosts = state.posts.filter(post => post.userId === user.id);

    const handleMenuClick = () => setMenuOpen((open) => !open);
    const handleDeleteAccount = () => {
        setMenuOpen(false);
        setShowDeleteConfirm(true);
    };
    const confirmDeleteAccount = () => {
        dispatch({ type: ACTIONS.DELETE_USER, payload: user.id });
        navigate('/');
    };
    const cancelDelete = () => setShowDeleteConfirm(false);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <ProfileHeader
                onBack={() => navigate('/home')}
                onMenuClick={handleMenuClick}
                showMenu={menuOpen}
            >
                {/* Dropdown Menu */}
                <div className="absolute right-4 top-16 w-56 bg-white shadow-md rounded-lg border border-gray-100 z-20 animate-fadeIn">
                    <button
                        onClick={handleDeleteAccount}
                        className="block w-full text-left px-6 py-3 text-red-600 font-bold hover:bg-orange-500 hover:text-white transition-colors border-b border-gray-100 last:border-b-0 rounded-t-lg rounded-b-lg"
                    >
                        Delete Account
                    </button>
                </div>
            </ProfileHeader>
            <ProfileUserInfo user={user} />
            <div className="px-6">
                <ProfilePostList posts={userPosts} />
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
    );
};

export default UserProfile; 