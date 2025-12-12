namespace PortfolioApi.Services;

public interface IYahooFinance
{
    public Task<YahooStockDetails> GetStockDetails(string symbol);
};