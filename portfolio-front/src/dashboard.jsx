import { useState } from 'react';
import { StockSidebar } from './components/stockSidebar';
import { useUserStocks } from './hooks/useUserStocks';
import { useStockData } from './hooks/useStockData';
import { useCalcSMA } from './hooks/useCalcSMA';
import { StockChart } from './components/stockChart';
import { UserButton } from '@clerk/clerk-react';
import { Box, Toolbar, AppBar, Typography, Button, Chip, Stack } from '@mui/material';

export default function DashboardPage() {
    const { data: stocks, isLoading, error } = useUserStocks();
    const [activeStock, setActiveStock] = useState(null);
    const [range, setRange] = useState(30);
    const [showSMA, setShowSMA] = useState(false);
    const [smaPeriod, setSmaPeriod] = useState(50);

    const { data: stockData, isLoading: loadingStocks } = useStockData(activeStock?.symbol, range);
    const { data: smaData } = useCalcSMA(activeStock?.symbol, range, smaPeriod, showSMA);

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
                            <>
                                <StockChart stockData={stockData} smaData={showSMA ? smaData : null} />

                                <Box sx={{
                                    mt: 3,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 2,
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>

                                    {/* Range Buttons Container (remains flex row) */}
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                                        {[7, 30, 90, 180].map(days => (
                                            <Button
                                                key={days}
                                                variant={range === days ? 'contained' : 'outlined'}
                                                onClick={() => setRange(days)}
                                                size="small"
                                            >
                                                {days}d
                                            </Button>
                                        ))}
                                    </Box>


                                    {/* Moving Averages Container */}
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 2,
                                        p: 2,
                                        bgcolor: 'grey.50',
                                        borderRadius: 1,
                                        border: 1,
                                        borderColor: 'grey.200'
                                    }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Moving averages:
                                        </Typography>

                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            {[50, 200].map(period => {
                                                const isActive = showSMA && smaPeriod === period;
                                                return (
                                                    <Chip
                                                        key={`sma-${period}`}
                                                        label={`SMA ${period}`}
                                                        size="small"
                                                        color={isActive ? 'primary' : 'default'}
                                                        variant={isActive ? 'filled' : 'outlined'}
                                                        onClick={() => {
                                                            if (isActive) {
                                                                setShowSMA(false);
                                                            } else {
                                                                setShowSMA(true);
                                                                setSmaPeriod(period);
                                                            }
                                                        }}
                                                        clickable
                                                    />
                                                );
                                            })}
                                        </Box>
                                    </Box>

                                </Box>
                            </>
                        ) : (
                            <Typography>Select a stock from the left to view data</Typography>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
