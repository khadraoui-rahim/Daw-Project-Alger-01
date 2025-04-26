import React from 'react'
import backgroundImage from '../../assets/images/background.jpg'
import rabbitLogo from '../../assets/images/rabbit.png'

const SplashScreen = () => {
    return (
        <div className="w-full h-screen relative overflow-hidden">
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
                <img
                    src={rabbitLogo}
                    alt="Rabbit Logo"
                    className="w-32 h-32 object-contain z-10"
                />
            </div>

            {/* App name at the bottom */}
            <div className="absolute bottom-12 inset-x-0 text-center">
                <h1 className="text-white text-2xl font-bold drop-shadow-lg">
                    rabbit social media app
                </h1>
            </div>
        </div>
    )
}

export default SplashScreen 