import { useState } from 'react';
import { StockSidebar } from './components/stock-sidebar';

export default function DashboardPage() {
    const [stocks, setStocks] = useState(['AAPL', 'GOOGL', 'MSFT']);
    const [activeStock, setActiveStock] = useState('AAPL');

    const handleAddStock = (newStock) => {
        setStocks([...stocks, newStock]);
        setActiveStock(newStock);
    };

    const handleRemoveStock = (stockToRemove) => {
        const updatedStocks = stocks.filter(stock => stock !== stockToRemove);
        setStocks(updatedStocks);

        if (activeStock === stockToRemove && updatedStocks.length > 0) {
            setActiveStock(updatedStocks[0]);
        } else if (updatedStocks.length === 0) {
            setActiveStock('');
        }
    };

    return (
        <div className="flex h-screen">
            <StockSidebar
                stocks={stocks}
                activeStock={activeStock}
                onSelectStock={setActiveStock}
                onAddStock={handleAddStock}
                onRemoveStock={handleRemoveStock}
            />

            <main className="flex-1 p-6 bg-gray-50">
                <h1 className="text-2xl font-bold mb-6">
                    {activeStock ? `Stock: ${activeStock}` : 'Select a stock'}
                </h1>
                {/* Ditt huvudinnehåll här */}
            </main>
        </div>
    );
}
