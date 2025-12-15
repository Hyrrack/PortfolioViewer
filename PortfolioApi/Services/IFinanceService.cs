using PortfolioApi.Models;

namespace PortfolioApi.Services;

public interface IFinanceService
{
    public Task<YahooStockDetails> GetDetailsFromYahoo(string symbol);
    public Task<StockData> GetDataFromYahoo(string symbol, int range);
    public Task<Stock> AddStock(string symbol, string userId);
    public Task<bool> DeleteStock(string symbol, string userId);
    public Task<MAResult> CalculateMovingAverage(string symbol, int range, int period);
}