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

    public async Task<bool> RemoveStockAsync(string symbol, string userId)
    {
        var stock = await _context.Stocks.FirstOrDefaultAsync(s => s.UserId == userId && s.Symbol == symbol);
        if (stock == null) return false;
        _context.Stocks.Remove(stock);
        await _context.SaveChangesAsync();
        return true;
    }
}