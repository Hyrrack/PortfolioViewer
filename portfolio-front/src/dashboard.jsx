import { useState } from 'react';
import { StockSidebar } from './components/stockSidebar';
import { useUserStocks } from './hooks/useUserStocks';
import { useStockData } from './hooks/useStockData';
import { StockChart } from './components/stockChart';
import { UserButton } from '@clerk/clerk-react';
import { Box, Toolbar, AppBar, Typography } from '@mui/material';

export default function DashboardPage() {
    const { data: stocks, isLoading, error } = useUserStocks();
    const [activeStock, setActiveStock] = useState(null);
    const { data: stockData, isLoading: loadingStocks } = useStockData(activeStock?.symbol);

    const handleAddStock = (newStock) => {
        setActiveStock(newStock);
    };

    if (isLoading) return <div>Loading stocks...</div>;

    if (error) return <div>Error loading stocks: {error.message}</div>;

    return (
        <Box sx={{ display: 'flex' }}>
            <StockSidebar
                stocks={stocks || []}
                activeStock={activeStock}
                onSelectStock={setActiveStock}
                onAddStock={handleAddStock}
            // onRemoveStock={handleRemoveStock}
            />

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                    <Toolbar sx={{ justifyContent: 'flex-end' }}>
                        <UserButton />
                    </Toolbar>
                </AppBar>

                {loadingStocks ? (
                    <div>Loading stock data...</div>
                ) : (

                    <Box sx={{ p: 3, mt: -8 }}>
                        {activeStock ? (
                            // Visa graf för vald aktie
                            <StockChart stockData={stockData} />
                        ) : (
                            // Visa instruktioner om ingen aktie vald
                            <Typography>Select a stock from the left to view data</Typography>
                        )}
                    </Box>
                )}
            </Box>


        </Box >
    );
}
