import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';

const BASE_URL = import.meta.env.VITE_API_URL;

export const useStockData = (symbol, range = 30) => {
    const { getToken } = useAuth();

    return useQuery({
        queryKey: ['stockData', symbol, range],
        queryFn: async () => {
            if (!symbol) return null;

            const token = await getToken();
            const response = await fetch(
                `${BASE_URL}/Stocks/${symbol}?range=${range}`,
            );

            if (!response.ok) throw new Error('Failed to fetch stock data');
            return response.json();
        },
        enabled: !!symbol, // Bara köra om symbol finns
        staleTime: 5 * 60 * 1000, // 5 minuter cache
        retry: 2, // Försök 2 gånger vid fel
    });
};