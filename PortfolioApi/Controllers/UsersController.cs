using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;
using PortfolioApi.Services;
using System.Security.Claims;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController(IUserRepository userRepository) : ControllerBase
{
    private readonly IUserRepository _userRepository = userRepository;

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<User>> GetOrCreateUser()
    {
        var clerkId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var fullName = User.FindFirst("fullname")?.Value;
        var userName = User.FindFirst("username")?.Value;

        var effectiveName = fullName ?? userName ?? "User";

        if (clerkId == null)
        {
            return Unauthorized("User ID claim not found.");
        }

        CreateUserDto response = await _userRepository.GetOrCreateUserAsync(effectiveName, clerkId);

        if (response.Created)
        {
            return CreatedAtAction(nameof(GetUserById), new { id = response.User.Id }, response.User);
        }
        else return Ok(response.User);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<User>> GetUserById(string id)
    {
        var user = await _userRepository.GetUserAsync(id);

        if (user == null) return NotFound();

        return Ok(user);
    }
}