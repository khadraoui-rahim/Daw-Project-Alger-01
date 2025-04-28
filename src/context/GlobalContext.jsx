import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { globalReducer, initialState } from '../reducers/globalReducer';

// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    // Load state from localStorage on initial render
    useEffect(() => {
        const savedState = localStorage.getItem('socialMediaState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            if (parsedState.currentUser) {
                dispatch({ type: 'LOGIN', payload: parsedState.currentUser });
            }
        }
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('socialMediaState', JSON.stringify(state));
    }, [state]);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
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