import React from 'react';
import UserHeading from './UserHeading';

const PostComment = ({ comment, user }) => {
    // Format the date for display
    const formattedDate = comment.timestamp ?
        new Date(comment.timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }) : '';

    return (
        <div className="mb-3">
            <UserHeading user={user} date={formattedDate} size="small" />
            <div className="pl-11 -mt-1 text-left">
                <p className="text-gray-900">{comment.text}</p>
            </div>
        </div>
    );
};

export default PostComment; 