import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { ACTIONS } from '../../reducers/globalReducer';
import rabbitLogo from '../../assets/images/rabbit.png';
import Post from '../post/Post';
import { posts as latestPosts } from '../../data/posts';
import UserHeading from '../post/UserHeading';
import './HomeScreen.css';

const HomeScreen = () => {
    const { state, dispatch, resetState } = useGlobalContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [hoveredPostId, setHoveredPostId] = useState(null);
    const menuRef = useRef(null);
    const modalRef = useRef(null);
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

    // Get sorted posts
    const getSortedPosts = () => {
        if (!state || !state.posts || !Array.isArray(state.posts) || state.posts.length === 0) {
            return [];
        }
        return [...state.posts].sort((a, b) => {
            if (!a.timestamp) return 1;
            if (!b.timestamp) return -1;
            return new Date(b.timestamp) - new Date(a.timestamp);
        });
    };

    const sortedPosts = getSortedPosts();

    // Set initial selected post to the first post
    useEffect(() => {
        if (sortedPosts.length > 0 && !selectedPostId) {
            setSelectedPostId(sortedPosts[0].id);
        }
    }, [sortedPosts.length]);

    // Get the selected post object for modal
    const selectedPost = sortedPosts.find(post => post.id === selectedPostId);

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

    // Handle post click to open modal
    const handlePostClick = (postId) => {
        setSelectedPostId(postId);
        setShowModal(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPostId(null);
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

    // Close modal when clicking outside
    useEffect(() => {
        const handleModalClickOutside = (event) => {
            if (showModal && modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal();
            }
        };

        document.addEventListener('mousedown', handleModalClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleModalClickOutside);
        };
    }, [showModal]);

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape' && showModal) {
                handleCloseModal();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [showModal]);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header - Fixed position to stay at top during scrolling */}
            <header className="bg-white py-3 px-4 border-b sticky top-0 z-10 shadow-sm">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center flex-1">
                        <img
                            src={rabbitLogo}
                            alt="Rabbit Logo"
                            className="h-14 w-14 rounded-full object-cover shadow-sm cursor-pointer"
                            onClick={handleHomeRedirect}
                        />
                    </div>

                    {/* User Profile in Center */}
                    <div
                        className="flex flex-col items-center justify-center cursor-pointer flex-1"
                        onClick={() => navigate('/profile')}
                    >
                        {state.currentUser && (
                            <UserHeading
                                user={state.currentUser}
                                size="medium"
                                hideDate={true}
                                noMargin={true}
                                center={true}
                            />
                        )}
                    </div>

                    {/* Sandwich Menu Button */}
                    <div ref={menuRef} className="flex-1 flex justify-end">
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

            {/* Main content - Grid Only Layout */}
            <main className="home-grid-layout flex-grow">
                <div className="posts-grid-container">
                    {sortedPosts.length === 0 ? (
                        <div className="no-posts-message">
                            <p className="text-gray-500 text-xl">No posts available</p>
                        </div>
                    ) : (
                        <div className="posts-grid">
                            {sortedPosts.map((post) => {
                                const postUser = state.users.find(user => user.id === post.userId) || {
                                    username: 'Unknown User',
                                    avatar: null
                                };
                                const isHovered = hoveredPostId === post.id;
                                
                                return (
                                    <div
                                        key={post.id}
                                        className="grid-post-item"
                                        onClick={() => handlePostClick(post.id)}
                                        onMouseEnter={() => setHoveredPostId(post.id)}
                                        onMouseLeave={() => setHoveredPostId(null)}
                                    >
                                        <img
                                            src={post.image}
                                            alt={post.caption || 'Post image'}
                                            className="grid-post-image"
                                        />
                                        
                                        {/* User Avatar and Name in Center - Shows when NOT hovered */}
                                        <div className={`grid-user-info ${isHovered ? 'hidden' : ''}`}>
                                            <img
                                                src={postUser.avatar || rabbitLogo}
                                                alt={postUser.username}
                                                className="avatar-image"
                                            />
                                            <p className="username-text">{postUser.username}</p>
                                        </div>
                                        
                                        {/* Overlay with post info - Shows on hover */}
                                        <div className={`grid-post-overlay ${isHovered ? 'visible' : ''}`}>
                                            <div className="overlay-stats">
                                                <div className="stat-item">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stat-icon" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                    </svg>
                                                    <span>{post.likes || 0}</span>
                                                </div>
                                                <div className="stat-item">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stat-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                    <span>{post.comments?.length || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            {/* Modal for Post Details */}
            {showModal && selectedPost && (
                <div className="modal-overlay">
                    <div className="modal-container" ref={modalRef}>
                        {/* Close button */}
                        <button
                            onClick={handleCloseModal}
                            className="modal-close-button"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* Post content */}
                        <div className="modal-content">
                            <Post post={selectedPost} showViewButton={false} />
                        </div>
                    </div>
                </div>
            )}

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