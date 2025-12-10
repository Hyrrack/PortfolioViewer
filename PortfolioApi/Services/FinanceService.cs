namespace PortfolioApi.Services;

public class FinanceService(IYahooFinance yahooService) : IFinanceService
{
    private readonly IYahooFinance _yahooService = yahooService;

    public async Task<YahooListStock> GetFromYahoo(string symbol)
    {
        YahooListStock yahooData = await _yahooService.GetStockData(symbol);
        return yahooData;
    }
}