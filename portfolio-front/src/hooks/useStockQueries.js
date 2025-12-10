import { useQuery } from "@tanstack/react-query";


const useStockData = (symbol) => {
    return useQuery({
        queryKey: ['stock', symbol],
        queryFn: () => fetch(`http://localhost:5058/Finance/${symbol}`).then(r => r.json()),
        staleTime: 5 * 60 * 1000, // 5 minutes cache
        enabled: !!symbol, // Only fetch when symbol exists
    });
};