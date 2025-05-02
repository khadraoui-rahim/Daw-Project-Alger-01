/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
            },
            animation: {
                fadeIn: 'fadeIn 0.2s ease-in-out',
                collapseDown: 'collapseDown 0.5s ease-out forwards',
                heartBeat: 'heartBeat 0.3s ease-in-out',
                heartFill: 'heartFill 0.5s ease-in-out forwards',
                heartParticle: 'heartParticle 1s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(-10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                collapseDown: {
                    '0%': {
                        opacity: 0,
                        transform: 'scaleY(0)',
                        transformOrigin: 'top'
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'scaleY(1)',
                        transformOrigin: 'top'
                    },
                },
                heartBeat: {
                    '0%': { transform: 'scale(1)' },
                    '25%': { transform: 'scale(1.2)' },
                    '50%': { transform: 'scale(0.95)' },
                    '75%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' },
                },
                heartFill: {
                    '0%': {
                        fill: 'transparent',
                        transform: 'scale(0.8)'
                    },
                    '50%': {
                        fill: 'rgba(239, 68, 68, 0.5)',
                        transform: 'scale(1.2)'
                    },
                    '100%': {
                        fill: 'rgb(239, 68, 68)',
                        transform: 'scale(1)'
                    },
                },
                heartParticle: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(0) scale(0)'
                    },
                    '15%': {
                        opacity: 1,
                        transform: 'translateY(0) scale(1)'
                    },
                    '100%': {
                        opacity: 0,
                        transform: 'translateY(-50px) scale(0)'
                    },
                },
            },
        },
    },
    plugins: [],
} 