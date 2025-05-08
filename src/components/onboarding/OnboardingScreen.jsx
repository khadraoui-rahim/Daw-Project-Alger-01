import React from 'react'
import './OnboardingScreen.css'
import rabbitLogo from '../../assets/images/rabbit.png'

const backgroundImages = [
    'https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1616666720738-0f4dbf0d3e9f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1610333529589-727a858ed911?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const onboardingContent = [
    {
        title: 'Welcome To the  Rabbit Social media',
    },
    {
        title: 'Best Social App To Make New Friends',
    },
    {
        title: 'Enjoy Your Life Every Time, Every Where',
    },
];

const OnboardingScreen = ({ onNext, onSkip, currentPage = 0 }) => {
    const currentContent = onboardingContent[currentPage] || onboardingContent[0];
    const bgImage = backgroundImages[currentPage] || backgroundImages[0];

    return (
        <div className="onboarding-split-container">
            {/* Left: Content */}
            <div className="onboarding-left-panel">
                <div className="skip-button">
                    <span className="skip-text" onClick={onSkip}>Skip</span>
                </div>
                <div className="onboarding-logo-wrapper">
                    <img src={rabbitLogo} alt="Rabbit Logo" className="onboarding-logo" />
                </div>
                <h1 className="onboarding-title font-inter">{currentContent.title}</h1>
                <div className="pagination-dots">
                    <div className={`dot ${currentPage === 0 ? 'active' : ''}`}></div>
                    <div className={`dot ${currentPage === 1 ? 'active' : ''}`}></div>
                    <div className={`dot ${currentPage === 2 ? 'active' : ''}`}></div>
                </div>
                <div className="button-container">
                    <button className="next-button" onClick={onNext}>
                        <span>Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Right: Background image */}
            <div
                className="onboarding-right-bg"
                style={{ backgroundImage: `url('${bgImage}')` }}
            ></div>
        </div>
    );
}

export default OnboardingScreen 