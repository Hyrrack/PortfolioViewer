using PortfolioApi.Data;
using PortfolioApi.Models;
namespace PortfolioApi.Data;

public class StockRepository(UserStockContext context) : IStockRepository
{
    private readonly UserStockContext _context = context;
    public async Task AddStockAsync(Stock newStock)
    {
        await _context.AddAsync(newStock);
        await _context.SaveChangesAsync();
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