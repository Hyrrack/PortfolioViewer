import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';

const BASE_API_URL = import.meta.env.VITE_API_URL;

const API_URL = `${BASE_API_URL}/Stocks`;

console.log('API URL:', BASE_API_URL);

export function useUserStocks() {
    const { getToken } = useAuth();

    return useQuery({
        queryKey: ['userStocks'],
        queryFn: async () => {
            const token = await getToken();
            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch stocks');
            return response.json();
        },
        staleTime: 5 * 60 * 1000,
    });
}
