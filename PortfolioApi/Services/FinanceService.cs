using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Data;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

public class FinanceService(IYahooFinance yahooService, IStockRepository stockRepository) : IFinanceService
{
    private readonly IYahooFinance _yahooService = yahooService;
    private readonly IStockRepository _stockRepository = stockRepository;

    public async Task<YahooStockDetails> GetDetailsFromYahoo(string symbol)
    {
        YahooStockDetails yahooData = await _yahooService.GetStockDetails(symbol);
        return yahooData;
    }

    public async Task<StockData> GetDataFromYahoo(string symbol, int range)
    {
        var data = await _yahooService.GetStockData(symbol, range);
        return data;
    }

    public async Task<Stock> AddStock(string symbol, string userId)
    {
        YahooStockDetails yahooData = await _yahooService.GetStockDetails(symbol);
        Stock newStock = new Stock
        {
            Symbol = yahooData.Symbol,
            CompanyName = yahooData.Name,
            UserId = userId
        };

        await _stockRepository.AddStockAsync(newStock);
        return newStock;
    }
}