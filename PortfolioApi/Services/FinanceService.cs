using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Data;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

public class FinanceService(IYahooFinance yahooService, IStockRepository stockRepository) : IFinanceService
{
    private readonly IYahooFinance _yahooService = yahooService;
    private readonly IStockRepository _stockRepository = stockRepository;

    public async Task<YahooListStock> GetFromYahoo(string symbol)
    {
        YahooListStock yahooData = await _yahooService.GetStockData(symbol);
        return yahooData;
    }

    public async Task<YahooListStock> AddStock(string symbol, string userId)
    {
        YahooListStock yahooData = await _yahooService.GetStockData(symbol);
        Stock newStock = new Stock
        {
            Symbol = yahooData.Symbol,
            CompanyName = yahooData.Name,
            UserId = userId
        };

        await _stockRepository.AddStockAsync(newStock);
        return yahooData;
    }
}