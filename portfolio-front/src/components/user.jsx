import React, { useEffect } from 'react';
import DashboardPage from '../dashboard';
import { useAuth } from '@clerk/clerk-react';
import { useMutation } from '@tanstack/react-query';

const BASE_API_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_API_URL}/Users`;

const getSyncStorageKey = (userId) => `userSyncStatus_${userId}`;

function UserSync() {
    const { getToken, isLoaded, userId } = useAuth();

    const {
        mutate: triggerSync,
        isLoading: isSyncing,
        isError,
        isSuccess,
        error
    } = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            if (!token) throw new Error('No token found');

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Backend sync failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (userId) {
                localStorage.setItem(getSyncStorageKey(userId), 'synced');
            }

            return data;
        },
        onError: (err) => {
            console.error('Sync error:', err);
        }
    });

    useEffect(() => {
        if (isLoaded && userId && localStorage.getItem(getSyncStorageKey(userId)) !== 'synced') {
            console.log("Initiating user sync via local storage check...");
            triggerSync();
        }
    }, [isLoaded, userId, triggerSync]);

    if (!isLoaded || isSyncing) {
        return <div>Adding user...</div>;
    }

    if (isError) {
        return <div>Error saving user: {error.message}</div>;
    }

    if (isSuccess || (isLoaded && userId && localStorage.getItem(getSyncStorageKey(userId)) === 'synced')) {
        return <DashboardPage />;
    }

    return <div>Preparing dashboard...</div>;
}

export default UserSync;
