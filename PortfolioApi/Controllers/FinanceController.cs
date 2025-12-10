using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("[controller]")]
public class FinanceController(IFinanceService financeService) : ControllerBase
{
    private readonly IFinanceService _financeService = financeService;

    [HttpGet("{symbol}")]
    public async Task<ActionResult<YahooListStock>> GetStock(string symbol)
    {
        var stock = await _financeService.GetFromYahoo(symbol);
        return stock;
    }
}
