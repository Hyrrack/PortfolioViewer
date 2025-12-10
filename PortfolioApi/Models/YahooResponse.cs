namespace PortfolioApi.Models;

public class YahooResponse
{
    public Chart Chart { get; set; }
}

public class Chart
{
    public List<Result> Result { get; set; }
}

public class Result
{
    public Meta Meta { get; set; }
}

public class Meta
{
    public string Symbol { get; set; }
    public string LongName { get; set; }    // Fullt namn: "Apple Inc."
    public string ShortName { get; set; }   // Kort namn: "Apple"
}