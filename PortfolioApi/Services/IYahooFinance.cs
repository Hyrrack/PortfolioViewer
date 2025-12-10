namespace PortfolioApi.Services;

public interface IYahooFinance
{
    public Task<YahooListStock> GetStockData(string symbol);
};