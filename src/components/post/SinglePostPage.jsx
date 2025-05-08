import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import Post from './Post';

const SinglePostPage = () => {
    const { id } = useParams();
    const { state } = useGlobalContext();
    const navigate = useNavigate();
    const post = state.posts.find(p => String(p.id) === String(id));

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-gray-500 text-lg">Post not found.</p>
                <button onClick={() => navigate('/home')} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full">Back to Home</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <div className="w-full max-w-xl mt-6 mx-4">
                <button onClick={() => navigate('/home')} className="mb-4 px-4 py-2 bg-orange-500 text-white rounded-full">Back to Home</button>
                <Post post={post} showViewButton={false} />
            </div>
        </div>
    );
};

export default SinglePostPage; 