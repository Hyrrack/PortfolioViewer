using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.DTOs;

public record StockDto
{
    [Required]
    public string Symbol { get; init; } = string.Empty;
}