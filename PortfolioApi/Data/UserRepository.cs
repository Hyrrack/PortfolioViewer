using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Data;

public class UserRepository(UserStockContext context) : IUserRepository
{
    private readonly UserStockContext _context = context;
    public async Task<CreateUserDto> GetOrCreateUserAsync(string name, string id)
    {
        var userExist = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (userExist != null) return new CreateUserDto
        {
            Created = false,
            User = userExist
        };
        var newUser = new User
        {
            Id = id,
            Name = name,
        };
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
        return new CreateUserDto
        {
            Created = true,
            User = newUser
        };
    }

    public async Task<User> GetUserWithStocksAsync(int userId)
    {
        throw new NotImplementedException();
    }
}