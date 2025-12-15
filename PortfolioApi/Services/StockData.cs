using PortfolioApi.Models;

public class StockData
{
    public string Symbol { get; set; }
    public string Name { get; set; }
    public List<DateTime> Dates { get; set; }
    public List<decimal> ClosingPrices { get; set; }
    public List<decimal> AdjustedClosingPrices { get; set; }

    public decimal TotalChange =>
        AdjustedClosingPrices.LastOrDefault() - AdjustedClosingPrices.FirstOrDefault();

    public decimal TotalChangePercent =>
    AdjustedClosingPrices.FirstOrDefault() != 0
        ? TotalChange / AdjustedClosingPrices.FirstOrDefault() * 100
        : 0;



    public static StockData FromYahooResponse(YahooResponse response)
    {
        var result = response.Chart.Result[0];

        var dates = result.Timestamp
            .Select(t => DateTimeOffset.FromUnixTimeSeconds(t).DateTime)
            .ToList();

        var closingPrices = result.Indicators.Quote[0].Close
            .Where(p => p.HasValue)
            .Select(p => p.Value)
            .ToList();

        var adjPrices = result.Indicators.Adjclose[0].Adjclose
            .Where(p => p.HasValue)
            .Select(p => p.Value)
            .ToList();

        return new StockData
        {
            Symbol = result.Meta.Symbol,
            Name = result.Meta.LongName,
            Dates = dates,
            ClosingPrices = closingPrices,
            AdjustedClosingPrices = adjPrices
        };
    }
}