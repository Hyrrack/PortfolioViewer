using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("[controller]")]
public class StocksController(IFinanceService financeService, IStockRepository stockRepository) : ControllerBase
{
    private readonly IFinanceService _financeService = financeService;
    private readonly IStockRepository _stockRepository = stockRepository;

    [HttpGet("{symbol}")]
    public async Task<ActionResult<StockData>> GetStockDetails(string symbol, int range)
    {
        var stock = await _financeService.GetDataFromYahoo(symbol, range);
        return stock;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Stock>>> GetUserStocks()
    {
        var clerkUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (clerkUserId == null)
        {
            return Unauthorized();
        }

        var stocks = await _stockRepository.GetUserStocksAsync(clerkUserId);
        return Ok(stocks);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Stock>> AddStock([FromBody] AddStockDto addStock)
    {
        var clerkUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (clerkUserId == null)
        {
            return Unauthorized();
        }

        var stock = await _financeService.AddStock(addStock.Symbol, clerkUserId);

        return Ok(stock);
    }
}
