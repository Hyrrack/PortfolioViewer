using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
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
    //Add response dto
    public async Task<ActionResult> CreateUser()
    {
        var clerkId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userName = User.FindFirst("name")?.Value;
        if (clerkId == null || userName == null)
        {
            return Unauthorized("User ID or Name claim not found.");
        }

        CreateUserDto response = await _userRepository.GetOrCreateUserAsync(userName, clerkId);
        if (response.Created) return Ok();
        else return Ok();
    }
}