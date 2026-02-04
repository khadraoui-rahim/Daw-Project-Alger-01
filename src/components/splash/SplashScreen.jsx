import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
                    <motion.div 
                        className="absolute inset-0 bg-white opacity-30 rounded-full blur-3xl scale-150"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <motion.svg
                        width="130"
                        height="130"
                        viewBox="0 0 130 130"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-32 h-32 z-10 relative drop-shadow-[0_0_60px_rgba(255,255,255,0.7)]"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                            duration: 0.8, 
                            ease: "easeOut",
                            type: "spring",
                            stiffness: 100
                        }}
                    >
                        <motion.rect 
                            width="129.881" 
                            height="129.881" 
                            rx="64.9405" 
                            fill="#FC5130"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        />
                        <motion.path 
                            d="M73.3906 42.7302V25.2864H80.2727C81.5901 25.2864 82.7144 25.5221 83.6457 25.9934C84.5826 26.459 85.2952 27.1205 85.7836 27.978C86.2776 28.8297 86.5246 29.8319 86.5246 30.9846C86.5246 32.143 86.2747 33.1396 85.775 33.9743C85.2753 34.8033 84.5514 35.4393 83.6031 35.8822C82.6605 36.3251 81.5191 36.5465 80.1791 36.5465H75.5711V33.5825H79.5828C80.2869 33.5825 80.8718 33.4859 81.3374 33.2929C81.8031 33.0998 82.1494 32.8102 82.3766 32.4241C82.6094 32.038 82.7258 31.5581 82.7258 30.9846C82.7258 30.4054 82.6094 29.9171 82.3766 29.5196C82.1494 29.1221 81.8002 28.8212 81.3289 28.6168C80.8633 28.4067 80.2756 28.3016 79.5658 28.3016H77.0787V42.7302H73.3906ZM82.811 34.7919L87.1463 42.7302H83.075L78.8333 34.7919H82.811Z" 
                            fill="white"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        />
                        <motion.path 
                            d="M99.7098 88.8524V85.8117H114.036V88.8524H108.696V103.255H105.05V88.8524H99.7098Z" 
                            fill="white"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        />
                        <motion.path 
                            d="M103.311 71.3831V88.8269H99.6231V71.3831H103.311Z" 
                            fill="white"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.55 }}
                        />
                        <motion.path 
                            d="M89.8793 74.5857V57.1419H96.8636C98.1469 57.1419 99.2173 57.3321 100.075 57.7125C100.932 58.093 101.577 58.6211 102.008 59.2968C102.44 59.9668 102.656 60.7391 102.656 61.6135C102.656 62.2949 102.519 62.894 102.247 63.4107C101.974 63.9218 101.599 64.342 101.122 64.6713C100.651 64.995 100.112 65.2249 99.5041 65.3612V65.5316C100.168 65.56 100.79 65.7474 101.369 66.0937C101.954 66.4401 102.428 66.9256 102.792 67.5502C103.155 68.1692 103.337 68.9073 103.337 69.7648C103.337 70.6903 103.107 71.5165 102.647 72.2433C102.193 72.9645 101.52 73.5352 100.628 73.9554C99.7369 74.3756 98.6381 74.5857 97.3321 74.5857H89.8793ZM93.5674 71.5705H96.574C97.6018 71.5705 98.3514 71.3746 98.8227 70.9828C99.294 70.5853 99.5296 70.0572 99.5296 69.3985C99.5296 68.9159 99.4132 68.49 99.1804 68.1209C98.9476 67.7518 98.6154 67.4622 98.1838 67.2521C97.758 67.042 97.2498 66.937 96.6592 66.937H93.5674V71.5705ZM93.5674 64.4413H96.3015C96.8069 64.4413 97.2554 64.3533 97.6472 64.1773C98.0447 63.9956 98.357 63.7401 98.5842 63.4107C98.817 63.0814 98.9334 62.6867 98.9334 62.2268C98.9334 61.5965 98.7091 61.0883 98.2605 60.7022C97.8176 60.316 97.1873 60.123 96.3696 60.123H93.5674V64.4413Z" 
                            fill="white"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        />
                        <motion.path 
                            d="M81.2682 59.5948H77.3161L83.338 42.151H88.0907L94.104 59.5948H90.1519L85.7825 46.1372H85.6462L81.2682 59.5948ZM81.0212 52.7383H90.3564V55.6172H81.0212V52.7383Z" 
                            fill="white"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.65 }}
                        />
                        <motion.path 
                            d="M47.623 42.0826C50.6207 41.085 54.1749 40.9238 58.3799 41.692C62.6225 42.4671 65.6572 44.0627 67.4375 46.5006C69.233 48.9594 69.4921 51.9142 68.9541 54.8239C68.0957 59.4656 65.1061 64.5789 61.7891 69.0582C66.2262 69.8008 69.668 72.5522 71.6201 76.2926C74.0866 81.0188 74.1451 87.2277 71.1641 92.8854L69.4951 92.0055L67.8262 91.1266C70.2708 86.4869 70.1292 81.5899 68.2754 78.0377C66.4496 74.5395 62.9362 72.2519 58.2129 72.6832L53.7402 73.0924L56.5801 69.6129C60.6796 64.5896 64.3782 58.8204 65.2441 54.1373C65.6656 51.8581 65.3744 50.0724 64.3906 48.7252C63.3915 47.3572 61.4169 46.0816 57.7021 45.403C53.9499 44.7175 51.0639 44.9141 48.8144 45.6627C46.5845 46.4049 44.8557 47.7304 43.4648 49.5201C40.6058 53.1994 39.206 58.7809 38.2002 65.0465L34.4756 64.4489C35.4793 58.1962 36.9744 51.724 40.4853 47.2057C42.2796 44.8967 44.6057 43.0869 47.623 42.0826ZM58.6172 76.9156C61.2958 76.9158 63.4668 79.0876 63.4668 81.7662C63.4668 84.4449 61.2958 86.6167 58.6172 86.6168C55.9384 86.6168 53.7666 84.445 53.7666 81.7662C53.7666 79.0875 55.9384 76.9156 58.6172 76.9156ZM28.9648 39.4606L29.4668 41.2789C21.9056 43.3644 18.809 45.9816 17.8144 48.3756C16.8388 50.7244 17.564 53.6612 19.8555 57.3092C22.1089 60.8967 25.5445 64.6466 29.0195 68.3678C32.4092 71.9976 35.905 75.667 37.9336 78.8854L34.7422 80.8971C32.9527 78.0582 29.7753 74.7045 26.2627 70.943C22.8353 67.2728 19.1396 63.2618 16.6611 59.316C14.2208 55.4311 12.6129 51.0622 14.3301 46.9283C16.0286 42.8395 20.6521 39.7968 28.4639 37.6422L28.9648 39.4606Z" 
                            fill="white"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.7 }}
                        />
                    </motion.svg>
                </div>
            </div>

            {/* App name at the bottom */}
            <motion.div 
                className="absolute bottom-24 inset-x-0 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
            >
                <h1 className="text-white text-2xl font-light drop-shadow-lg font-inter">
                    rabbit social media app
                </h1>
            </motion.div>
        </div>
    )
}

export default SplashScreen