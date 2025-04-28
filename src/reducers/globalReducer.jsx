import { posts } from '../data/posts';
import { users } from '../data/users';

// Action Types
export const ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    ADD_POST: 'ADD_POST',
    LIKE_POST: 'LIKE_POST',
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
            return {
                ...state,
                currentUser: action.payload,
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

        case ACTIONS.LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === action.payload
                        ? { ...post, likes: post.likes + 1 }
                        : post
                ),
            };

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