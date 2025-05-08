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
    REGISTER_USER: 'REGISTER_USER',
    DELETE_USER: 'DELETE_USER',
    DELETE_COMMENT: 'DELETE_COMMENT',
    DELETE_POST: 'DELETE_POST',
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

        case ACTIONS.REGISTER_USER:
            // Generate a new user ID (max ID + 1)
            const newUserId = Math.max(...state.users.map(user => user.id)) + 1;
            const newUser = {
                ...action.payload,
                id: newUserId,
            };

            return {
                ...state,
                users: [...state.users, newUser],
                currentUser: newUser, // Auto login after registration
            };

        case ACTIONS.DELETE_USER:
            const userIdToDelete = action.payload;

            // Filter out the user
            const updatedUsers = state.users.filter(user => user.id !== userIdToDelete);

            // Filter out posts made by the user
            const postsWithoutUser = state.posts.filter(post => post.userId !== userIdToDelete);

            // Remove comments made by the user from remaining posts
            const postsWithoutUserComments = postsWithoutUser.map(post => ({
                ...post,
                comments: post.comments.filter(comment => comment.userId !== userIdToDelete),
                // Also remove the user from likedBy arrays
                likedBy: post.likedBy ? post.likedBy.filter(id => id !== userIdToDelete) : [],
                // Update like count to match the new likedBy array
                likes: post.likedBy ? post.likedBy.filter(id => id !== userIdToDelete).length : 0
            }));

            // Check if the deleted user is the current user
            const newCurrentUser = state.currentUser && state.currentUser.id === userIdToDelete
                ? null
                : state.currentUser;

            return {
                ...state,
                users: updatedUsers,
                posts: postsWithoutUserComments,
                currentUser: newCurrentUser
            };

        case ACTIONS.DELETE_COMMENT:
            const { postId, commentId } = action.payload;

            return {
                ...state,
                posts: state.posts.map(post =>
                    post.id === postId
                        ? {
                            ...post,
                            comments: post.comments.filter(comment => comment.id !== commentId)
                        }
                        : post
                )
            };

        case ACTIONS.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload),
            };

        default:
            return state;
    }
}; 