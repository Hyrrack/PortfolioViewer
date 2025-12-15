using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var clerkIssuerUrl = builder.Configuration["Clerk:IssuerUrl"];

Console.WriteLine($"DEBUG: Loaded Issuer URL: {clerkIssuerUrl}");

if (string.IsNullOrEmpty(clerkIssuerUrl))
{
    throw new InvalidOperationException("Clerk:IssuerUrl configuration value is missing.");
}

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<UserStockContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// JWT Bearer 
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Clerk:IssuerUrl"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Clerk:IssuerUrl"],
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            NameClaimType = "sub",
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddHttpClient();

builder.Services.AddScoped<IStockRepository, StockRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddScoped<IYahooFinance, YahooFinance>();
builder.Services.AddScoped<IFinanceService, FinanceService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:5173",
                "https://portfolio-viewer-wine.vercel.app"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowReactApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Use(async (context, next) =>
{
    Console.WriteLine($"DEBUG: Auth scheme: {context.Request.Headers["Authorization"]}");
    await next();
});

app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
