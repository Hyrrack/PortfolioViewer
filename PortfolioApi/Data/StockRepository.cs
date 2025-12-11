using PortfolioApi.Data;
using PortfolioApi.Models;
namespace PortfolioApi.Data;

public class StockRepository(UserStockContext context) : IStockRepository
{
    private readonly UserStockContext _context = context;
    public Task AddStockAsync(Stock newStock)
    {
        throw new NotImplementedException();
    }

    public Task<List<Stock>> GetUserStocksAsync(int userId)
    {
        throw new NotImplementedException();
    }

    public Task RemoveStockAsync(int stockId, int userId)
    {
        throw new NotImplementedException();
    }
}