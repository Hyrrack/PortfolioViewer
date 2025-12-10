namespace PortfolioApi.Services;

public interface IFinanceService
{
    public Task<YahooListStock> GetFromYahoo(string symbol);
}