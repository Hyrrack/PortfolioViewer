import { useState } from "react"

// Simplified Imports to use basic HTML elements
// Removed all shadcn/ui components (Card, Input, Button, ScrollArea, Separator, Icons)

export function StockSidebar({ stocks, activeStock, onSelectStock }) {

    // All adding/searching logic and state removed

    return (
        <div className="stock-sidebar" style={{ width: '200px', height: '100%', borderRight: '1px solid #ccc', padding: '10px' }}>
            <h3 style={{ marginBottom: '10px' }}>Your Stocks</h3>

            <div className="stock-list-container" style={{ maxHeight: 'calc(100% - 100px)', overflowY: 'auto' }}>
                {stocks.length === 0 ? (
                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#666' }}>No stocks yet</p>
                ) : (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {stocks.map((stock) => (
                            <li
                                key={stock}
                                style={{
                                    padding: '8px',
                                    marginBottom: '5px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    backgroundColor: activeStock === stock ? '#eee' : 'transparent',
                                    fontWeight: activeStock === stock ? 'bold' : 'normal',
                                }}
                                onClick={() => onSelectStock(stock)}
                            >
                                {stock}
                                {/* Removed the remove button functionality */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* The entire Add Stock footer functionality has been removed */}
        </div>
    )
}
