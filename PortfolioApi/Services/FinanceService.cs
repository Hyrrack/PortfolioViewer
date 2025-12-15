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

    public async Task<MAResult> CalculateMovingAverage(string symbol, int range, int period)
    {
        int totalDays = range + period;
        var stockData = await GetDataFromYahoo(symbol, totalDays);

        var maPoints = CalculateMA(stockData.AdjustedClosingPrices, period);

        return new MAResult
        {
            Dates = stockData.Dates.TakeLast(range).ToList(),
            Prices = stockData.AdjustedClosingPrices.TakeLast(range).ToList(),
            SMA = [.. maPoints.TakeLast(range)]
        };
    }

    public async Task<Stock> AddStock(string symbol, string userId)
    {
        var existingStock = await _stockRepository.GetUserStockAsync(symbol, userId);
        if (existingStock != null) return existingStock;

        YahooStockDetails yahooData = await _yahooService.GetStockDetails(symbol);
        Stock newStock = new()
        {
            Symbol = yahooData.Symbol,
            CompanyName = yahooData.Name,
            UserId = userId
        };

        await _stockRepository.AddStockAsync(newStock);
        return newStock;
    }

    public async Task<bool> DeleteStock(string symbol, string userId)
    {
        var deleted = await _stockRepository.RemoveStockAsync(symbol, userId);
        return deleted;
    }

    private static List<decimal> CalculateMA(List<decimal> prices, int period)
    {
        var ma = new List<decimal>();
        for (int i = period - 1; i < prices.Count; i++)
        {
            decimal sum = 0;
            for (int j = 0; j < period; j++)
            {
                sum += prices[i - j];
            }
            ma.Add(Math.Round(sum / period, 2));
        }
        return ma;
    }
}