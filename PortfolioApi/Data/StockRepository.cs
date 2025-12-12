using Microsoft.EntityFrameworkCore;
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

    public async Task<List<Stock>> GetUserStocksAsync(string userId)
    {
        return await context.Stocks
            .Where(s => s.UserId == userId)
            .ToListAsync();
    }

    public Task RemoveStockAsync(int stockId, string userId)
    {
        throw new NotImplementedException();
    }
}