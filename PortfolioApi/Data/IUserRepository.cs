using PortfolioApi.Models;
namespace PortfolioApi.Data;

public interface IUserRepository
{
    Task<User> GetOrCreateUserAsync(string name, int id);
    Task<User> GetUserWithStocksAsync(int userId);
}
