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
    const dates = stockData?.dates || [];
    const prices = stockData?.closingPrices || [];

    if (dates.length === 0) {
        return <div>Loading chart data...</div>;
    }

    const chartData = dates.map((dateStr, index) => ({
        date: new Date(dateStr),
        price: prices[index] || 0,
    }));

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                {stockData?.name} ({stockData?.symbol})
            </Typography>

            <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(date) => new Date(date).toLocaleDateString('sv-SE')}
                        />
                        <YAxis />
                        <Tooltip
                            labelFormatter={(date) => new Date(date).toLocaleDateString('sv-SE')}
                            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
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