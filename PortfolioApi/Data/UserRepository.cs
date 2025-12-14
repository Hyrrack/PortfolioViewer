using Microsoft.AspNetCore.Http.HttpResults;
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
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            user = new User { Id = id, Name = name };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new CreateUserDto
            {
                Created = true,
                User = user
            };
        }

        return new CreateUserDto
        {
            Created = true,
            User = user
        };
    }

    public async Task<User?> GetUserAsync(string userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null) return null;
        return user;
    }
}