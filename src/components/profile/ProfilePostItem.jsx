import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { ACTIONS } from '../../reducers/globalReducer';

const ProfilePostItem = ({ post }) => {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useGlobalContext();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            dispatch({ type: ACTIONS.DELETE_POST, payload: post.id });
        }
    };

    return (
        <div
            className="flex items-center mb-5 group relative cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded mr-4 overflow-hidden">
                {post.image ? (
                    <img src={post.image} alt="post img" className="object-cover w-full h-full" />
                ) : (
                    <span className="text-black text-center text-xs">post<br />img</span>
                )}
            </div>
            <div className="text-lg font-semibold text-black uppercase flex-1 text-left">{post.caption}</div>
            {/* View and Delete buttons appear on hover */}
            <button
                onClick={() => navigate(`/post/${post.id}`)}
                className={`ml-2 px-3 py-1 bg-orange-500 text-white text-xs rounded-full shadow hover:bg-orange-600 focus:outline-none transition-opacity duration-200 ${hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                aria-label="View Post"
            >
                View
            </button>
            <button
                onClick={handleDelete}
                className={`ml-2 px-3 py-1 bg-red-500 text-white text-xs rounded-full shadow hover:bg-red-600 focus:outline-none transition-opacity duration-200 ${hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                aria-label="Delete Post"
            >
                Delete
            </button>
        </div>
    );
};

export default ProfilePostItem; 