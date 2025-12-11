using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.Models;


public class UserRepository(UserStockContext context) : IUserRepository
{
    private readonly UserStockContext _context = context;
    public async Task<User> GetOrCreateUserAsync(string name, int id)
    {
        var userExist = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (userExist != null) return userExist;
        var newUser = new User
        {
            Id = id,
            Name = name,
        };
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
        return newUser;
    }

    public async Task<User> GetUserWithStocksAsync(int userId)
    {
        throw new NotImplementedException();
    }
}