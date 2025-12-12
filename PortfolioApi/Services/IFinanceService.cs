using PortfolioApi.Models;

namespace PortfolioApi.Services;

public interface IFinanceService
{
    public Task<YahooStockDetails> GetFromYahoo(string symbol);
    public Task<Stock> AddStock(string symbol, string userId);
}