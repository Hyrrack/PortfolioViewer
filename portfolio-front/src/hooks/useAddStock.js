import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';

const API_URL = `${import.meta.env.VITE_API_URL}/Stocks`;

export const useAddStock = () => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (stockSymbol) => {
            const token = await getToken();
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symbol: stockSymbol }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Failed to add stock');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userStocks'] });
        },
        onError: (error) => {
            console.error('Failed to add stock:', error);
        },
    });
}