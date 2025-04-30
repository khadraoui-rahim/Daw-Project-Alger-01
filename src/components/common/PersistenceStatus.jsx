import React, { useEffect, useState } from 'react';
import { isStatePersisted } from '../../utils/storage';

const PersistenceStatus = () => {
    const [isPersisted, setIsPersisted] = useState(isStatePersisted());
    const [showStatus, setShowStatus] = useState(false);

    // Check persistence status on mount
    useEffect(() => {
        setIsPersisted(isStatePersisted());
    }, []);

    // Set up a listener for localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            setIsPersisted(isStatePersisted());
            setShowStatus(true);

            // Hide the status after 2 seconds
            setTimeout(() => {
                setShowStatus(false);
            }, 2000);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Also show status when component first mounts
    useEffect(() => {
        setShowStatus(true);
        setTimeout(() => {
            setShowStatus(false);
        }, 2000);
    }, []);

    if (!showStatus) return null;

    return (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-md 
            ${isPersisted ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'} 
            transition-opacity duration-300 ${showStatus ? 'opacity-100' : 'opacity-0'}`}
        >
            {isPersisted ? 'Changes saved' : 'Not saved'}
        </div>
    );
};

export default PersistenceStatus; 