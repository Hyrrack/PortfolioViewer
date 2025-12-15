using PortfolioApi.Models;

namespace PortfolioApi.Data;

public interface IStockRepository
{
    Task AddStockAsync(Stock newStock);
    Task<bool> RemoveStockAsync(string symbol, string userId);
    Task<List<Stock>> GetUserStocksAsync(string userId);
}
