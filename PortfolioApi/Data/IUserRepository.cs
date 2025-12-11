using PortfolioApi.DTOs;
using PortfolioApi.Models;
namespace PortfolioApi.Data;

public interface IUserRepository
{
    Task<CreateUserDto> GetOrCreateUserAsync(string name, int id);
    Task<User> GetUserWithStocksAsync(int userId);
}
