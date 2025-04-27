import React, { useEffect, useState } from 'react'
import backgroundImage from '../../assets/images/background.jpg'
import rabbitLogo from '../../assets/images/rabbit.png'
import './SplashScreen.css'

const SplashScreen = ({ onSplashComplete }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
        }, 2000);

        const completeTimer = setTimeout(() => {
            if (onSplashComplete) {
                onSplashComplete();
            }
        }, 2500); // Add extra time for the fade-out animation to complete

        return () => {
            clearTimeout(timer);
            clearTimeout(completeTimer);
        };
    }, [onSplashComplete]);

    return (
        <div className={`splash-screen w-full h-screen relative overflow-hidden ${fadeOut ? 'fade-out' : ''}`}>
            {/* Background image with orange overlay */}
            <div className="absolute inset-0">
                <img
                    src={backgroundImage}
                    alt="Background"
                    className="w-full h-full object-cover object-left-top"
                />
                <div className="absolute inset-0 bg-orange-500 opacity-25"></div>
            </div>

            {/* Logo in the middle */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-white opacity-30 rounded-full blur-3xl scale-150"></div>
                    <img
                        src={rabbitLogo}
                        alt="Rabbit Logo"
                        className="w-32 h-32 object-contain z-10 relative rounded-full shadow-[0_0_60px_30px_rgba(255,255,255,0.7)]"
                    />
                </div>
            </div>

            {/* App name at the bottom */}
            <div className="absolute bottom-24 inset-x-0 text-center">
                <h1 className="text-white text-2xl font-light drop-shadow-lg font-inter">
                    rabbit social media app
                </h1>
            </div>
        </div>
    )
}

export default SplashScreen 