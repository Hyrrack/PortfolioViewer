namespace PortfolioApi.Services;

public interface IYahooFinance
{
    public Task<YahooStockDetails> GetStockDetails(string symbol);
    public Task<StockData> GetStockData(string symbol, int range);
};