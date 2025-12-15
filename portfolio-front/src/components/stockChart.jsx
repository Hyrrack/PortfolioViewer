import { Box, Typography } from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export const StockChart = ({ stockData }) => {
    if (!stockData) {
        return <div>No stock data found...</div>
    }

    const dates = stockData?.dates || [];
    const prices = stockData?.adjustedClosingPrices || [];

    if (dates.length === 0) {
        return (
            <div>
                No historical data available for {stockData.symbol}
            </div>
        );
    }

    const chartData = dates.map((dateStr, index) => ({
        date: new Date(dateStr),
        price: prices[index] || 0,
    }));

    const priceValues = prices.filter(p => p != null);
    const minPrice = Math.min(...priceValues);
    const maxPrice = Math.max(...priceValues);
    const padding = (maxPrice - minPrice) * 0.1

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                {stockData?.name} ({stockData?.symbol})
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 2 }}>
                <Typography variant="h5" color={stockData.totalChangePercent >= 0 ? 'success.main' : 'error.main'}>
                    {stockData.totalChangePercent >= 0 ? '+' : ''}{stockData.totalChangePercent?.toFixed(2)}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Past {stockData.dates?.length} days
                </Typography>
            </Box>

            <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

                        <XAxis
                            dataKey="date"
                            tickFormatter={(date) => new Date(date).toLocaleDateString('sv-SE')}
                            tick={{ fill: '#666' }}
                        />

                        <YAxis
                            domain={[minPrice - padding, maxPrice + padding]}
                            tickFormatter={(value) => `$${value.toFixed(2)}`}
                            tick={{ fill: '#666' }}
                            width={80}
                        />

                        <Tooltip
                            labelFormatter={(date) => new Date(date).toLocaleDateString('sv-SE')}
                            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                            contentStyle={{ borderRadius: 8 }}
                        />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#8884d8"
                            name="Closing Price"
                            dot={false}
                            activeDot={{ r: 4 }}
                        />

                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};