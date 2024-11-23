using ConsultasOdontologicasAPI.Data;
using Microsoft.EntityFrameworkCore;
using ConsultasOdontologicasAPI.Models;
using BCrypt.Net;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configuração de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Permitir o React
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.EnsureCreated(); 

    if (!context.Usuarios.Any(u => u.TipoUsuario == "Administrador"))
    {
        var admin = new Usuario
        {
            Nome = "Administrador",
            Email = "admin@admin.com",
            Senha = BCrypt.Net.BCrypt.HashPassword("admin123"), 
            TipoUsuario = "Administrador"
        };

        context.Usuarios.Add(admin);
        context.SaveChanges();
        Console.WriteLine("Usuário administrador criado: admin@admin.com / admin123");
    }
}

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin"); // Ativando o CORS

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
