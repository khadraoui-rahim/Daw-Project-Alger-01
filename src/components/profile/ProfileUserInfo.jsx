import React from 'react';

const getValidAvatarUrl = (avatarUrl) => {
    if (!avatarUrl) return 'https://via.placeholder.com/150';
    if (avatarUrl.startsWith('src/') || avatarUrl.startsWith('./')) {
        return 'https://via.placeholder.com/150';
    }
    return avatarUrl;
};

const ProfileUserInfo = ({ user }) => (
    <div className="flex flex-col items-center mt-6 mb-8">
        <img
            src={getValidAvatarUrl(user.avatar)}
            alt={user.username}
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 shadow-md mb-4"
        />
        <div className="text-3xl font-extrabold text-black uppercase">{user.username}</div>
        <div className="text-gray-400 text-base font-semibold mt-1">USER ID : {user.id}</div>
    </div>
);

export default ProfileUserInfo; 