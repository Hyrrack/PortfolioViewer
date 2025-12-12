using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

public class YahooFinance(IHttpClientFactory httpClientFactory) : IYahooFinance
{
    private readonly IHttpClientFactory _httpClientFactory = httpClientFactory;

    public async Task<YahooStockDetails> GetStockDetails(string symbol)
    {
        var client = _httpClientFactory.CreateClient();

        var request = new HttpRequestMessage(
            HttpMethod.Get,
            $"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}");

        request.Headers.Add("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36");
        request.Headers.Add("Accept", "application/json");

        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var responseData = await response.Content.ReadFromJsonAsync<YahooResponse>();

        if (responseData?.Chart?.Result?[0]?.Meta == null)
        {
            throw new InvalidOperationException("Invalid response from Yahoo Finance");
        }

        return new YahooStockDetails
        {
            Symbol = responseData.Chart.Result[0].Meta.Symbol,
            Name = responseData.Chart.Result[0].Meta.LongName
        };
    }
}