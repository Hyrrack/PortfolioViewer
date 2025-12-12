import React, { useEffect } from 'react';
import DashboardPage from '../dashboard';
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from '@tanstack/react-query';

const BASE_API_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_API_URL}/Users`;

function UserSync() {
    const { getToken, isSignedIn } = useAuth();

    const { mutate: triggerSync, isLoading, isError, isSuccess, error } = useMutation({
        mutationFn: async () => {
            const token = await getToken();
            if (!token) throw new Error("No token found");

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
            return response.json();
        },
        onSuccess: (data) => {
            console.log("User synced successfully!", data);
        },
        onError: (err) => {
            console.error("Sync error:", err);
        }
    });


    useEffect(() => {
        if (isSignedIn) {
            if (!isSuccess && !isLoading) {
                triggerSync();
            }
        }
    }, [isSignedIn, isSuccess, isLoading, triggerSync]);


    if (isLoading) {
        return <div>Adding user...</div>;
    }

    if (isError) {
        return <div>Error saving user: {error.message}</div>;
    }

    if (isSuccess) {
        return <DashboardPage />;
    }

    return <div>Waiting ...</div>;
}

export default UserSync;
