
import { Card, CardBody, Stat, StatLabel, StatNumber, Badge } from '@chakra-ui/react'

export const Sidebar = () => {
    const stocks = [
        { symbol: "AAPL", price: 189.25 },
        { symbol: "GOOG", price: 135.42 }
    ];

    return (
        <>
            <ul>
                {stocks.map(s => (
                    <li key={s.symbol}>{s.symbol} price: {s.price}</li>
                ))}
            </ul>
            <button>+</button>
        </>
    )
}