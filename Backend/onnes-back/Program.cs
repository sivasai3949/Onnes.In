using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Onnes.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Onnes"));
});

// Update CORS policy to allow specific origins
builder.Services.AddCors(options => options.AddPolicy("corspolicy", policy =>
{
    policy.WithOrigins("https://onnescryogenics.com.au", "https://www.onnescryogenics.com.au")  // Allow both root and www subdomains
          .AllowAnyMethod()
          .AllowAnyHeader();
}));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDeveloperExceptionPage();
app.UseRouting();
app.UseStaticFiles();

app.UseCors("corspolicy");

// Map static files for images
app.UseStaticFiles(new StaticFileOptions()
{
    FileProvider = new PhysicalFileProvider(
                   Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", "images")),
    RequestPath = new PathString("/images")
});

// Enable directory browsing for images
app.UseDirectoryBrowser(new DirectoryBrowserOptions()
{
    FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", "images")),
    RequestPath = new PathString("/images")
});

// Enable Swagger for API documentation and testing
app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

// Map controllers to endpoints
app.MapControllers();

// Scope service usage for proper disposal of DbContext or other DI 
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    // Perform initialization or operations as needed
}

// Run the application and bind it to all network interfaces on specified HTTP port
app.Run("http://0.0.0.0:5179"); // Use HTTP only
