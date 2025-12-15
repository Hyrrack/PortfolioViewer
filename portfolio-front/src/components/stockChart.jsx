import { Box, Typography } from '@mui/material';
import {
    LineChart,
    AreaChart,
    Area,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

export const StockChart = ({ stockData, smaData }) => {
    if (!stockData) {
        return <div>No stock data found...</div>
    }

    const dates = stockData?.dates || [];
    const prices = stockData?.adjustedClosingPrices || [];
    const sma = smaData?.sma || [];

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
        sma: sma[index] || null
    }));

    const priceValues = prices.filter(p => p != null);
    const smaValues = sma.filter(p => p != null);
    const allValues = [...priceValues, ...smaValues];

    const minPrice = Math.min(...allValues);
    const maxPrice = Math.max(...allValues);
    const padding = (maxPrice - minPrice) * 0.1;

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
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
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

                            formatter={(value, name, props) => {
                                let label = name;
                                if (props.dataKey === 'price') {
                                    label = 'Closing Price';
                                } else if (props.dataKey === 'sma') {
                                    label = `SMA (${smaData?.period})`;
                                }
                                return [`$${value.toFixed(2)}`, label];
                            }}
                            contentStyle={{ borderRadius: 8 }}
                        />

                        {/* <Legend /> */}

                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#8884d8"
                            name="Closing Price"
                            dot={false}
                            activeDot={{ r: 4 }}
                            fill="url(#colorPrice)"
                        />

                        {smaData && (
                            <Line
                                type="monotone"
                                dataKey="sma"
                                stroke="#FFB300" // <-- This is the color change
                                strokeWidth={2}
                                strokeDasharray="5 3"
                                name={`SMA (${smaData.period})`}
                                dot={false}
                            />
                        )}

                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};
