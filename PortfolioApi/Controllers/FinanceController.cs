using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("[controller]")]
public class FinanceController(IFinanceService financeService, IUserRepository userRepository) : ControllerBase
{
    private readonly IFinanceService _financeService = financeService;
    private readonly IUserRepository _userRepository = userRepository;

    [HttpGet("{symbol}")]
    public async Task<ActionResult<YahooListStock>> GetStock(string symbol)
    {
        var stock = await _financeService.GetFromYahoo(symbol);
        return stock;
    }

    [HttpPut]
    public async Task<ActionResult> AddStock(string symbol)
    {
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult> CreateUser()
    {
        CreateUserDto user = await _userRepository.GetOrCreateUserAsync("Felix", 1);
        if (user.Created) return Ok();
        else return Ok();
    }


}
