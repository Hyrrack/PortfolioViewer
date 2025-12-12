namespace PortfolioApi.Models;

public class YahooResponse
{
    public Chart Chart { get; set; }
}

public class Chart
{
    public List<Result> Result { get; set; }
    public object Error { get; set; }
}

public class Result
{
    public Meta Meta { get; set; }
    public List<long> Timestamp { get; set; }
    public Indicators Indicators { get; set; }
}

public class Meta
{
    public string Symbol { get; set; }
    public string LongName { get; set; }
    public string ShortName { get; set; }
    public string Currency { get; set; }
    public decimal RegularMarketPrice { get; set; }
}



public class Indicators
{
    public List<Quote> Quote { get; set; }
    public List<AdjClose> Adjclose { get; set; }
}

public class Quote
{
    public List<decimal?> Close { get; set; }
    public List<decimal?> Open { get; set; }
    public List<decimal?> High { get; set; }
    public List<decimal?> Low { get; set; }
    public List<long?> Volume { get; set; }
}

public class AdjClose
{
    public List<decimal?> Adjclose { get; set; }
}
