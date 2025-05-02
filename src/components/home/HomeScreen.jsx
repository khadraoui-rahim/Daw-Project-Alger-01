import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { ACTIONS } from '../../reducers/globalReducer';
import rabbitLogo from '../../assets/images/rabbit.png';
import PostList from '../post/PostList';
import { posts as latestPosts } from '../../data/posts';

const HomeScreen = () => {
    const { state, dispatch, resetState } = useGlobalContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Merge posts helper function - preserves comments and likes
    const mergePostsWithLatest = (currentPosts, newPosts) => {
        // Start with the latest posts as base
        return newPosts.map(latestPost => {
            // Find if this post exists in current state
            const existingPost = currentPosts.find(p => p.id === latestPost.id);

            if (existingPost) {
                // Use the existing post (with comments and likes) but ensure it has all fields from latest
                return {
                    ...latestPost,
                    comments: existingPost.comments || [],
                    likes: existingPost.likes || 0,
                    likedBy: existingPost.likedBy || []
                };
            }

            // If post doesn't exist in current state, use the latest one
            return latestPost;
        });
    };

    // Force a refresh of posts from posts.jsx when component mounts
    // but preserve comments and likes
    useEffect(() => {
        const checkForNewPosts = () => {
            // Get the IDs of current posts
            const currentPostIds = state.posts.map(post => post.id);
            // Get the IDs of latest posts
            const latestPostIds = latestPosts.map(post => post.id);

            // Check if there are any new posts
            const hasNewPosts = latestPostIds.some(id => !currentPostIds.includes(id));

            // If there are new posts, merge them with existing ones
            if (hasNewPosts) {
                const mergedPosts = mergePostsWithLatest(state.posts, latestPosts);

                // Also include user-created posts that might not be in latest
                state.posts.forEach(existingPost => {
                    if (!mergedPosts.some(p => p.id === existingPost.id)) {
                        mergedPosts.push(existingPost);
                    }
                });

                // Update localStorage with merged posts
                localStorage.setItem('socialMediaState', JSON.stringify({
                    ...state,
                    posts: mergedPosts
                }));

                // Refresh page to apply changes without full reload
                window.location.href = '/home';
            }
        };

        checkForNewPosts();
        // Only run once on component mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        dispatch({ type: ACTIONS.LOGOUT });
        setMenuOpen(false);
        navigate('/');
    };

    const handleResetOnboarding = () => {
        // Set onboarding status to false and redirect to root
        localStorage.removeItem('onboardingComplete');
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleHomeRedirect = () => {
        // Use React Router navigation instead of page reload
        navigate('/home');
        setMenuOpen(false);
    };

    const handleRefreshPosts = () => {
        // Merge the latest posts with the current posts to preserve comments and likes
        const mergedPosts = mergePostsWithLatest(state.posts, latestPosts);

        // Also include any existing posts not in the latest data
        state.posts.forEach(existingPost => {
            if (!mergedPosts.some(p => p.id === existingPost.id)) {
                mergedPosts.push(existingPost);
            }
        });

        // Update localStorage with merged posts
        localStorage.setItem('socialMediaState', JSON.stringify({
            ...state,
            posts: mergedPosts
        }));

        // Refresh page to apply changes without full reload
        window.location.href = '/home';
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header - Fixed position to stay at top during scrolling */}
            <header className="bg-white py-3 px-4 border-b sticky top-0 z-10 shadow-sm">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src={rabbitLogo}
                            alt="Rabbit Logo"
                            className="h-14 w-14 rounded-full object-cover shadow-sm cursor-pointer"
                            onClick={handleHomeRedirect}
                        />
                    </div>

                    {/* Sandwich Menu Button */}
                    <div ref={menuRef}>
                        <button
                            onClick={toggleMenu}
                            className="p-2 focus:outline-none bg-transparent"
                            aria-label="Menu"
                            style={{ background: 'none' }}
                        >
                            <div className="space-y-2 w-8">
                                <div className="w-full h-0.5 bg-orange-500 rounded"></div>
                                <div className="w-full h-0.5 bg-orange-500 rounded"></div>
                                <div className="w-full h-0.5 bg-orange-500 rounded"></div>
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {menuOpen && (
                            <div className="bg-white shadow-md absolute right-4 top-16 w-56 z-10 rounded-lg overflow-hidden border border-gray-100 animate-fadeIn">
                                <div className="py-1">
                                    <a
                                        href="#"
                                        className="block px-6 py-3 text-gray-800 hover:bg-orange-500 hover:text-white border-b border-gray-100"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleHomeRedirect();
                                        }}
                                    >
                                        Home
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-6 py-3 text-gray-800 hover:bg-orange-500 hover:text-white border-b border-gray-100"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/new-post');
                                            setMenuOpen(false);
                                        }}
                                    >
                                        Create Post
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-6 py-3 text-gray-800 hover:bg-orange-500 hover:text-white border-b border-gray-100"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleRefreshPosts();
                                        }}
                                    >
                                        Refresh Posts
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-6 py-3 text-gray-800 hover:bg-orange-500 hover:text-white border-b border-gray-100"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/profile');
                                            setMenuOpen(false);
                                        }}
                                    >
                                        My Account
                                    </a>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleResetOnboarding();
                                        }}
                                        className="block px-6 py-3 text-gray-800 hover:bg-orange-500 hover:text-white border-b border-gray-100"
                                    >
                                        Show Onboarding
                                    </a>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLogout();
                                        }}
                                        className="block px-6 py-3 text-gray-800 hover:bg-orange-500 hover:text-white"
                                    >
                                        Logout
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main content - Posts */}
            <main className="max-w-screen-sm mx-auto p-4 flex-grow bg-white">
                <PostList />
            </main>

            {/* Floating Action Button for creating a new post */}
            <div className="fixed right-6 bottom-6">
                <button
                    onClick={() => navigate('/new-post')}
                    className="bg-orange-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors"
                    aria-label="Create new post"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

// Add this to your tailwind.config.js if needed for animation
// extend: {
//   animation: {
//     fadeIn: 'fadeIn 0.2s ease-in-out',
//   },
//   keyframes: {
//     fadeIn: {
//       '0%': { opacity: 0, transform: 'translateY(-10px)' },
//       '100%': { opacity: 1, transform: 'translateY(0)' },
//     },
//   },
// }

export default HomeScreen; 