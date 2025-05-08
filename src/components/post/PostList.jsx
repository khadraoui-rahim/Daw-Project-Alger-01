import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import Post from './Post';

const PostList = () => {
    const { state } = useGlobalContext();
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const scrollObserverRef = useRef(null);
    const POSTS_PER_LOAD = 2;

    // Sort posts by timestamp (most recent first)
    const getSortedPosts = () => {
        if (!state || !state.posts || !Array.isArray(state.posts) || state.posts.length === 0) {
            return [];
        }

        return [...state.posts].sort((a, b) => {
            // Handle missing timestamps
            if (!a.timestamp) return 1;
            if (!b.timestamp) return -1;
            return new Date(b.timestamp) - new Date(a.timestamp);
        });
    };

    const sortedPosts = getSortedPosts();

    // Update visible posts when global state changes to reflect new comments, likes, etc.
    useEffect(() => {
        if (visiblePosts.length > 0 && state.posts.length > 0) {
            // Create a new array with updated post data
            const updatedVisiblePosts = visiblePosts.map(visiblePost => {
                // Find the matching post in the global state
                const updatedPost = state.posts.find(p => p.id === visiblePost.id);
                // Return the updated post from global state if found, otherwise return the original
                return updatedPost || visiblePost;
            });

            setVisiblePosts(updatedVisiblePosts);
        }
    }, [state.posts]);

    // Load initial posts
    useEffect(() => {
        if (sortedPosts.length > 0 && visiblePosts.length === 0) {
            const initialPosts = sortedPosts.slice(0, POSTS_PER_LOAD);
            setVisiblePosts(initialPosts);
            setCurrentIndex(POSTS_PER_LOAD);
        }
    }, [sortedPosts.length, visiblePosts.length]);

    const loadMorePosts = useCallback(() => {
        if (currentIndex >= sortedPosts.length || isLoading) return;

        setIsLoading(true);

        // Simulate network delay for visual feedback
        setTimeout(() => {
            // Get the next batch of posts based on the current index
            const nextPosts = sortedPosts.slice(
                currentIndex,
                Math.min(currentIndex + POSTS_PER_LOAD, sortedPosts.length)
            );

            // Make sure we're adding new posts, not duplicating existing ones
            const newVisiblePosts = [...visiblePosts];
            nextPosts.forEach(post => {
                // Only add posts that don't already exist in visible posts
                if (!newVisiblePosts.some(p => p.id === post.id)) {
                    newVisiblePosts.push(post);
                }
            });

            setVisiblePosts(newVisiblePosts);

            // Update the current index to point to the next batch
            setCurrentIndex(currentIndex + POSTS_PER_LOAD);
            setIsLoading(false);
        }, 800); // 800ms delay for visual feedback
    }, [currentIndex, isLoading, sortedPosts, visiblePosts]);

    // Fallback scroll handler for browsers that don't support IntersectionObserver
    const handleScroll = useCallback(() => {
        if (!scrollObserverRef.current) return;

        const scrollPosition = window.innerHeight + window.scrollY;
        const scrollThreshold = document.body.offsetHeight - 300;

        if (scrollPosition >= scrollThreshold && currentIndex < sortedPosts.length && !isLoading) {
            loadMorePosts();
        }
    }, [currentIndex, isLoading, loadMorePosts, sortedPosts.length]);

    // Set up intersection observer for infinite scrolling
    useEffect(() => {
        // Try to use IntersectionObserver if supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && currentIndex < sortedPosts.length) {
                        loadMorePosts();
                    }
                },
                { threshold: 0.1, rootMargin: '200px' }
            );

            if (scrollObserverRef.current) {
                observer.observe(scrollObserverRef.current);
            }

            return () => {
                if (scrollObserverRef.current) {
                    observer.unobserve(scrollObserverRef.current);
                }
            };
        } else {
            // Fallback to scroll event listener if IntersectionObserver is not supported
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [currentIndex, handleScroll, loadMorePosts, sortedPosts.length]);

    // Calculate container height based on visible posts
    // This ensures there's enough scrollable area even with few posts
    const containerStyle = {
        minHeight: visiblePosts.length < sortedPosts.length
            ? `calc(100vh + ${Math.min(visiblePosts.length, 2) * 50}vh)`
            : 'auto'
    };

    // Check if posts exist
    if (sortedPosts.length === 0) {
        return (
            <div className="mt-4 text-center">
                <p className="text-gray-500">No posts found.</p>
            </div>
        );
    }

    return (
        <div className="mt-4" style={containerStyle}>
            {visiblePosts.map((post, index) => (
                <div
                    key={post.id}
                    className={`transition-opacity duration-300 ease-in-out`}
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <Post post={post} showViewButton={true} />
                </div>
            ))}

            {/* Loading indicator and scroll observer */}
            {currentIndex < sortedPosts.length && (
                <div
                    ref={scrollObserverRef}
                    className="text-center py-8 mt-4"
                >
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
                    <p className="text-sm text-gray-500 mt-2">Loading more posts...</p>
                </div>
            )}
        </div>
    );
};

export default PostList; 