import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { globalReducer, initialState } from '../reducers/globalReducer';
import { posts as latestPosts } from '../data/posts';
import { users as latestUsers } from '../data/users';

// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
    // Initialize with either the saved state from localStorage or the default initialState
    const getInitialState = () => {
        const savedState = localStorage.getItem('socialMediaState');
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState);

                // Merge the saved posts with the latest posts
                // This preserves comments and likes while ensuring all posts exist
                const mergedPosts = latestPosts.map(latestPost => {
                    // Find if this post exists in saved state
                    const savedPost = parsedState.posts.find(p => p.id === latestPost.id);

                    if (savedPost) {
                        // Use the saved post (with comments and likes) but ensure it has all fields from latest
                        return {
                            ...latestPost,
                            comments: savedPost.comments || [],
                            likes: savedPost.likes || 0,
                            likedBy: savedPost.likedBy || []
                        };
                    }

                    // If post doesn't exist in saved state, use the latest one
                    return latestPost;
                });

                // Also include any posts that might be in saved state but not in latest posts
                // (like user-created posts)
                parsedState.posts.forEach(savedPost => {
                    if (!mergedPosts.some(p => p.id === savedPost.id)) {
                        mergedPosts.push(savedPost);
                    }
                });

                // Update user avatars from latest user data to ensure correct URLs
                const mergedUsers = parsedState.users.map(savedUser => {
                    // Find the corresponding user in latest data
                    const latestUser = latestUsers.find(u => u.id === savedUser.id);

                    if (latestUser) {
                        // Keep user data but update the avatar URL
                        return {
                            ...savedUser,
                            avatar: latestUser.avatar
                        };
                    }

                    return savedUser;
                });

                // Also update currentUser avatar if it exists
                let updatedCurrentUser = parsedState.currentUser;
                if (updatedCurrentUser) {
                    const latestUser = latestUsers.find(u => u.id === updatedCurrentUser.id);
                    if (latestUser) {
                        updatedCurrentUser = {
                            ...updatedCurrentUser,
                            avatar: latestUser.avatar
                        };
                    }
                }

                return {
                    ...parsedState,
                    posts: mergedPosts,
                    users: mergedUsers,
                    currentUser: updatedCurrentUser
                };
            } catch (e) {
                console.error('Error parsing saved state:', e);
                return initialState;
            }
        }
        return initialState;
    };

    const [state, dispatch] = useReducer(globalReducer, getInitialState());

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('socialMediaState', JSON.stringify(state));
    }, [state]);

    // Function to reset state to initial values (useful for debugging or logout)
    const resetState = () => {
        localStorage.removeItem('socialMediaState');
        window.location.reload();
    };

    return (
        <GlobalContext.Provider value={{ state, dispatch, resetState }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook for using the context
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
}; 