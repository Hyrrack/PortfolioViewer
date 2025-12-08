const sidebar = () => {
    const stocks = ["AAPL", "GOOG"]

    return (
        <>
            <ul>
                {stocks.map(s => (
                    <li>{s}</li>
                ))}
            </ul>
            <button>+</button>
        </>
    )
}