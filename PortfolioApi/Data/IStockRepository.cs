using PortfolioApi.Models;

namespace PortfolioApi.Data;

public interface IStockRepository
{
    Task AddStockAsync(Stock newStock);
    Task RemoveStockAsync(int stockId, string userId);
    Task<List<Stock>> GetUserStocksAsync(string userId);
}
