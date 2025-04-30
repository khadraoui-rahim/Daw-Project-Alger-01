import { posts } from '../data/posts';
import { users } from '../data/users';

// Action Types
export const ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    ADD_POST: 'ADD_POST',
    LIKE_POST: 'LIKE_POST',
    UNLIKE_POST: 'UNLIKE_POST',
    ADD_COMMENT: 'ADD_COMMENT',
};

// Initial State
export const initialState = {
    currentUser: null,
    users: users,
    posts: posts,
};

// Reducer Function
export const globalReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            // When logging in, maintain the current posts state
            return {
                ...state,
                currentUser: {
                    ...action.payload,
                    likedPosts: action.payload.likedPosts || []
                },
            };

        case ACTIONS.LOGOUT:
            return {
                ...state,
                currentUser: null,
            };

        case ACTIONS.ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            };

        case ACTIONS.LIKE_POST: {
            const postId = action.payload;
            const post = state.posts.find(p => p.id === postId);

            // Check if the post exists
            if (!post) return state;

            // Check if the current user already liked this post
            const userLiked = post.likedBy && post.likedBy.includes(state.currentUser.id);

            if (userLiked) {
                // Unlike: remove user from likedBy and decrease likes count
                return {
                    ...state,
                    posts: state.posts.map(post =>
                        post.id === postId
                            ? {
                                ...post,
                                likes: Math.max(0, post.likes - 1),
                                likedBy: post.likedBy.filter(id => id !== state.currentUser.id)
                            }
                            : post
                    )
                };
            } else {
                // Like: add user to likedBy and increase likes count
                return {
                    ...state,
                    posts: state.posts.map(post =>
                        post.id === postId
                            ? {
                                ...post,
                                likes: post.likes + 1,
                                likedBy: [...(post.likedBy || []), state.currentUser.id]
                            }
                            : post
                    )
                };
            }
        }

        case ACTIONS.ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === action.payload.postId
                        ? {
                            ...post,
                            comments: [
                                ...post.comments,
                                {
                                    id: post.comments.length + 1,
                                    userId: state.currentUser.id,
                                    text: action.payload.comment,
                                    timestamp: new Date().toISOString()
                                },
                            ],
                        }
                        : post
                ),
            };

        default:
            return state;
    }
}; 