using PortfolioApi.Models;

namespace PortfolioApi.Data;

public interface IStockRepository
{
    Task AddStockAsync(Stock newStock);
    Task RemoveStockAsync(int stockId, int userId);
    Task<List<Stock>> GetUserStocksAsync(int userId);
}
