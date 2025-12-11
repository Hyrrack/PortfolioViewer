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
        var fullName = User.FindFirst("fullname")?.Value;
        var userName = User.FindFirst("username")?.Value;

        System.Console.WriteLine($"DEBUG: clerkId={clerkId}");
        System.Console.WriteLine($"DEBUG: fullName={fullName}");
        System.Console.WriteLine($"DEBUG: userName={userName}");
        System.Console.WriteLine($"DEBUG: All claims:");

        var effectiveName = fullName ?? userName ?? "User";

        // Denna if-sats gör INGET - ta bort den!
        if (clerkId == null || effectiveName == null)
        {
            return Unauthorized("User ID or Name claim not found.");
        }

        CreateUserDto response = await _userRepository.GetOrCreateUserAsync(effectiveName, clerkId);

        // Det här är onödigt - båda returnerar Ok()
        if (response.Created) return Ok();
        else return Ok();
    }

    [HttpGet]
    [Authorize]
    public IActionResult SimpleTest()
    {
        Console.WriteLine("✅ SIMPLE TEST - WE MADE IT INTO THE METHOD!");

        return Ok(new
        {
            Message = "Authorized!",
            UserId = User.FindFirst("sub")?.Value,
            Name = User.FindFirst("fullname")?.Value
        });
    }
}