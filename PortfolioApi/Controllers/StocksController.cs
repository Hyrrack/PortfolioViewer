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
        try
        {
            var stock = await _financeService.GetDataFromYahoo(symbol, range);
            return Ok(stock);
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{symbol}/sma")]
    public async Task<ActionResult<MAResult>> GetSMA(
        [FromRoute] string symbol,
        [FromQuery] int range = 30,
        [FromQuery] int period = 20)
    {
        try
        {
            var sma = await _financeService.CalculateMovingAverage(symbol, range, period);
            if (sma == null)
                return NotFound($"Could not calculate SMA for {symbol}");
            return Ok(sma);
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "Internal server error");
        }
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
    public async Task<ActionResult<Stock>> AddStock([FromBody] StockDto addStock)
    {
        var clerkUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (clerkUserId == null)
        {
            return Unauthorized();
        }
        try
        {
            var stock = await _financeService.AddStock(addStock.Symbol, clerkUserId);

            return Ok(stock);
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "An internal error occurred while adding stock.");
        }
    }

    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> DeleteStock([FromBody] StockDto deleteStock)
    {
        var clerkUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (clerkUserId == null)
        {
            return Unauthorized();
        }
        var deleted = await _financeService.DeleteStock(deleteStock.Symbol, clerkUserId);
        if (!deleted) return NotFound($"Stock with symbol {deleteStock.Symbol} was not found for this user.");
        return NoContent();
    }
}
