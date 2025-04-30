import React from 'react';
import PostComment from './PostComment';

const PostComments = ({ comments, users, showAllComments, toggleComments }) => {
    // Make sure comments is an array
    if (!comments || !Array.isArray(comments) || comments.length === 0) {
        return null;
    }

    // Make sure users is an array
    if (!users || !Array.isArray(users)) {
        users = [];
    }

    // Show only 2 comments when not expanded
    const visibleComments = showAllComments ? comments : comments.slice(0, 2);

    return (
        <div className="pt-2">
            {visibleComments.map(comment => (
                <PostComment
                    key={comment.id}
                    comment={comment}
                    user={users.find(user => user.id === comment.userId) || {
                        username: 'Unknown User',
                        avatar: null
                    }}
                />
            ))}

            {comments.length > 2 && (
                <button
                    onClick={toggleComments}
                    className="text-black font-bold text-sm uppercase mt-2 focus:outline-none bg-transparent border-none"
                >
                    {showAllComments ? 'SHOW LESS' : 'SHOW MORE COMMENTS'}
                </button>
            )}
        </div>
    );
};

export default PostComments; 