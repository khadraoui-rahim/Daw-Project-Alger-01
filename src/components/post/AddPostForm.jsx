import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { ACTIONS } from '../../reducers/globalReducer';

const AddPostForm = ({ onBack }) => {
    const { state, dispatch } = useGlobalContext();
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!imageUrl || !caption) {
            setError('Both image URL and caption are required');
            return;
        }

        // Create new post object
        const newPost = {
            id: Date.now(), // Use timestamp as a simple unique ID
            userId: state.currentUser.id,
            image: imageUrl,
            caption: caption,
            likes: 0,
            likedBy: [],
            comments: [],
            timestamp: new Date().toISOString()
        };

        // Dispatch action to add post
        dispatch({ type: ACTIONS.ADD_POST, payload: newPost });

        // Show success message
        setSuccess(true);
        setError('');

        // Redirect after a short delay to show the success message
        setTimeout(() => {
            navigate('/home');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="bg-orange-500 text-white py-6 px-4 flex items-center">
                <div
                    className="flex items-center"
                    onClick={onBack}
                    style={{ cursor: 'pointer' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="ml-1">Back</span>
                </div>
                <h1 className="text-xl font-bold flex-1 text-center">Create Post</h1>
                <div className="w-16"></div> {/* Spacer for centering */}
            </div>

            {/* Content */}
            <div className="bg-white flex-1 p-5 rounded-t-3xl -mt-3">
                <h2 className="text-3xl font-bold mb-2">New Post</h2>
                <p className="text-gray-600 mb-8">Share something amazing with your followers!</p>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Post created successfully! Redirecting...</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Image URL Input */}
                    <div className="mb-4 relative">
                        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 border-2 border-transparent focus-within:border-orange-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Enter image URL"
                                className="bg-transparent w-full focus:outline-none text-black placeholder-gray-500"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                required
                                disabled={success}
                            />
                        </div>
                    </div>

                    {/* Caption Input */}
                    <div className="mb-8 relative">
                        <div className="flex items-start bg-gray-100 rounded-lg px-4 py-3 border-2 border-transparent focus-within:border-orange-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <textarea
                                placeholder="Write a caption..."
                                className="bg-transparent w-full focus:outline-none text-black placeholder-gray-500 resize-none min-h-[100px]"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                required
                                disabled={success}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white py-4 px-4 rounded-full flex items-center justify-between ${success ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
                        disabled={success}
                    >
                        <span className="font-bold">{success ? 'Post Created' : 'Create Post'}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </form>

                {/* Preview section */}
                {imageUrl && (
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4">Preview</h3>
                        <div className="border rounded-lg overflow-hidden">
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="w-full h-auto"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                                }}
                            />
                            {caption && (
                                <div className="p-4">
                                    <p className="text-gray-900">{caption}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddPostForm; 