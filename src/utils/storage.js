/**
 * Utility functions for handling localStorage storage
 */

/**
 * Check if the state is persisted in localStorage
 * @returns {boolean} True if state exists in localStorage
 */
export const isStatePersisted = () => {
    return localStorage.getItem('socialMediaState') !== null;
};

/**
 * Get the current persisted state
 * @returns {Object|null} The persisted state or null if not exists
 */
export const getPersistedState = () => {
    const data = localStorage.getItem('socialMediaState');
    if (data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error('Error parsing persisted state:', e);
            return null;
        }
    }
    return null;
};

/**
 * Debug function to check posts state in localStorage
 * @returns {Array|null} The posts array from localStorage or null if not exists
 */
export const checkPersistedPosts = () => {
    const state = getPersistedState();
    return state?.posts || null;
};

/**
 * Debug function to check if a specific post has likes
 * @param {number} postId - The post ID to check
 * @returns {Object|null} Information about the post's likes
 */
export const checkPostLikes = (postId) => {
    const state = getPersistedState();
    if (!state?.posts) return null;

    const post = state.posts.find(p => p.id === postId);
    if (!post) return { error: 'Post not found' };

    return {
        postId,
        likes: post.likes,
        likedBy: post.likedBy || []
    };
};

/**
 * Debug function to check if a specific post has comments
 * @param {number} postId - The post ID to check
 * @returns {Object|null} Information about the post's comments
 */
export const checkPostComments = (postId) => {
    const state = getPersistedState();
    if (!state?.posts) return null;

    const post = state.posts.find(p => p.id === postId);
    if (!post) return { error: 'Post not found' };

    return {
        postId,
        comments: post.comments || []
    };
}; 