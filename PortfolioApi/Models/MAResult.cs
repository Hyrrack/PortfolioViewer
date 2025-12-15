namespace PortfolioApi.Models;

public class MAResult
{
    public string Symbol { get; set; }
    public string Name { get; set; }
    public List<DateTime> Dates { get; set; }
    public List<decimal> Prices { get; set; } // Adjusted closing
    public List<decimal> SMA { get; set; }    // Simple moving average
    public int Period { get; set; }

    // Optional helper properties
    public decimal CurrentPrice => Prices?.LastOrDefault() ?? 0;
    public decimal CurrentSMA => SMA?.LastOrDefault() ?? 0;
    public decimal PriceVsSMA => CurrentPrice - CurrentSMA;
    public bool PriceAboveSMA => CurrentPrice > CurrentSMA;
}