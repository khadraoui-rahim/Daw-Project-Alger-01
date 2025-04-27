import React from 'react'
import './OnboardingScreen.css'
import onBoardingImage1 from '../../assets/images/onBoarding1.jpg'
import onBoardingImage2 from '../../assets/images/onBoarding2.jpg'
import onBoardingImage3 from '../../assets/images/onBoarding3.jpg'

const OnboardingScreen = ({ onNext, onSkip, currentPage = 0 }) => {
    // Define content for each onboarding page
    const onboardingContent = [
        {
            image: onBoardingImage1,
            title: "Welcome To the Rabbit Social media"
        },
        {
            image: onBoardingImage2,
            title: "Best Social App To Make New Friends"
        },
        {
            image: onBoardingImage3,
            title: "Enjoy Your Life Every Time, Every Where"
        }
    ];

    // Get current content based on page
    const currentContent = onboardingContent[currentPage] || onboardingContent[0];

    return (
        <div className="onboarding-container">
            {/* Skip button */}
            <div className="skip-button">
                <span className="skip-text" onClick={onSkip}>Skip</span>
            </div>

            {/* Background image with rounded corners at bottom */}
            <div className="onboarding-image-container">
                <img
                    src={currentContent.image}
                    alt={`Onboarding ${currentPage + 1}`}
                    className="onboarding-image"
                />

                {/* Title overlaid on image */}
                <div className="image-overlay-content">
                    <h1 className="onboarding-title font-inter">
                        {currentContent.title}
                    </h1>

                    {/* Pagination dots */}
                    <div className="pagination-dots">
                        <div className={`dot ${currentPage === 0 ? 'active' : ''}`}></div>
                        <div className={`dot ${currentPage === 1 ? 'active' : ''}`}></div>
                        <div className={`dot ${currentPage === 2 ? 'active' : ''}`}></div>
                    </div>
                </div>
            </div>

            {/* Next button */}
            <div className="button-container">
                <button
                    className="next-button"
                    onClick={onNext}
                >
                    <span>Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default OnboardingScreen 