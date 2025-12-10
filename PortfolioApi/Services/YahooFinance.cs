using System.Net.Http.Json;
using System.Text.Json;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

public class YahooFinance(HttpClient _httpClient)
{
    public async Task<YahooListStock> GetStockData(string symbol)
    {
        var url = $"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}";

        var response = await _httpClient.GetFromJsonAsync<YahooResponse>(url);

        return new YahooListStock
        {
            Symbol = response.Chart.Result[0].Meta.Symbol,
            Name = response.Chart.Result[0].Meta.LongName
        };
    }
}