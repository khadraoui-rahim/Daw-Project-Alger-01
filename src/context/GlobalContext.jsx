import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { globalReducer, initialState } from '../reducers/globalReducer';

// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
    // Initialize with either the saved state from localStorage or the default initialState
    const getInitialState = () => {
        const savedState = localStorage.getItem('socialMediaState');
        if (savedState) {
            try {
                return JSON.parse(savedState);
            } catch (e) {
                console.error('Error parsing saved state:', e);
                return initialState;
            }
        }
        return initialState;
    };

    const [state, dispatch] = useReducer(globalReducer, getInitialState());

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('socialMediaState', JSON.stringify(state));
    }, [state]);

    // Function to reset state to initial values (useful for debugging or logout)
    const resetState = () => {
        localStorage.removeItem('socialMediaState');
        window.location.reload();
    };

    return (
        <GlobalContext.Provider value={{ state, dispatch, resetState }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook for using the context
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
}; 