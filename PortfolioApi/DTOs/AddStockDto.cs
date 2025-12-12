using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.DTOs;

public record AddStockDto
{
    [Required]
    public string Symbol { get; init; } = string.Empty;
}