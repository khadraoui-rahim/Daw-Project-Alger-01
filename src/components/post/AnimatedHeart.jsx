import React, { useState, useEffect } from 'react';

// Heart particle animation component
const HeartParticles = ({ show }) => {
    if (!show) return null;

    // Generate 6 random particles
    const particles = Array.from({ length: 6 }, (_, i) => {
        const size = Math.floor(Math.random() * 10) + 10; // 10-20px
        const xOffset = (Math.random() * 60) - 30; // -30px to +30px
        const delay = Math.random() * 0.2; // 0-0.2s delay

        return (
            <div
                key={i}
                className="absolute animate-float-heart opacity-0"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `calc(50% + ${xOffset}px)`,
                    top: '50%',
                    animationDelay: `${delay}s`
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgb(239, 68, 68)"
                    className="w-full h-full"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </div>
        );
    });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles}
        </div>
    );
};

const AnimatedHeart = ({ isLiked, onClick, className = '', likesCount = 0 }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [showParticles, setShowParticles] = useState(false);
    const [fillColor, setFillColor] = useState(isLiked ? "rgb(239, 68, 68)" : "transparent");

    // Update fill color when isLiked changes
    useEffect(() => {
        setFillColor(isLiked ? "rgb(239, 68, 68)" : "transparent");
    }, [isLiked]);

    // Handle the click with an animation
    const handleClick = () => {
        setIsAnimating(true);
        setShowParticles(true);

        if (!isLiked) {
            // Animate the fill color
            setFillColor("rgba(239, 68, 68, 0.5)");
            setTimeout(() => {
                setFillColor("rgb(239, 68, 68)");
            }, 200);
        }

        // Reset animation state after a delay
        setTimeout(() => {
            setIsAnimating(false);
        }, 500);

        // Hide particles after animation completes
        setTimeout(() => {
            setShowParticles(false);
        }, 1000);

        // Call the passed onClick handler
        onClick();
    };

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                className="flex items-center focus:outline-none bg-transparent relative z-10"
                aria-label="Like"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={fillColor}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        transition: "transform 0.3s, fill 0.3s",
                        transform: isAnimating ? "scale(1.2)" : "scale(1)"
                    }}
                    className={`h-6 w-6 ${isLiked ? 'text-red-500' : 'text-black'} ${className}`}
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span className={`ml-1 transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-black'}`}>
                    Like
                </span>
                <span className={`ml-1 font-medium transition-colors duration-300 ${isLiked ? 'text-red-500' : 'text-black'}`}>
                    ({likesCount})
                </span>
            </button>

            {/* Floating heart particles */}
            <HeartParticles show={showParticles} />
        </div>
    );
};

export default AnimatedHeart; 