import { useQuery } from "@tanstack/react-query";


const BASE_URL = import.meta.env.VITE_API_URL;

export const useCalcSMA = (symbol, range = 30, period, isEnabled) => {
    return useQuery({
        queryKey: ['sma', symbol, range, period],
        queryFn: async () => {
            const response = await fetch(
                `${BASE_URL}/Stocks/${symbol}/sma?range=${range}&period=${period}`
            );
            if (!response.ok) throw new Error('SMA fetch failed');
            return response.json();
        },

        enabled: !!symbol && isEnabled,
    });
};
