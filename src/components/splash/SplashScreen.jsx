import React, { useEffect, useState } from 'react'
import rabbitLogo from '../../assets/images/rabbit.png'
import './SplashScreen.css'

const PC_BACKGROUND = 'https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

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
            <div className="splash-bg absolute inset-0" />
            <div className="absolute inset-0 bg-orange-500 opacity-25 pointer-events-none" />

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