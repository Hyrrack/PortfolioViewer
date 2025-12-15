# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com AS build
WORKDIR /app

# Copy the project files and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the source code and build
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Use the official ASP.NET runtime image to run the application
FROM mcr.microsoft.com AS final
WORKDIR /app
COPY --from=build /app/publish .

# Set the entry point to run your API
ENTRYPOINT ["dotnet", "PortfolioApi.dll"] 
# Make sure "PortfolioApi.dll" matches the actual output DLL name of your project
