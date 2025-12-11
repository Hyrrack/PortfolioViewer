using Microsoft.EntityFrameworkCore;
using PortfolioApi.Models;
namespace PortfolioApi.Data;

public class UserStockContext(DbContextOptions<UserStockContext> opts) : DbContext(opts)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Stock> Stocks { get; set; }
}