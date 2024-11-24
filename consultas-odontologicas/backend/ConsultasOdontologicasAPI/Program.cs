using ConsultasOdontologicasAPI.Data;
using ConsultasOdontologicasAPI.Endpoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;
using ConsultasOdontologicasAPI.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("sua_chave_secreta_super_segura")), // Substituir por uma chave segura
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapAuthEndpoints();
app.MapConsultaEndpoints();
app.MapDentistaEndpoints();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await CriarAdminPadrao(db);
}

async Task CriarAdminPadrao(AppDbContext db)
{
    if (!await db.Usuarios.AnyAsync(u => u.Role == "Admin"))
    {
        using var sha256 = SHA256.Create();
        var senhaPadrao = "admin123";
        var senhaHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(senhaPadrao)));

        var admin = new Usuario
        {
            Nome = "Administrador",
            Email = "admin@email.com",
            Senha = senhaHash,
            Role = "Admin"
        };

        db.Usuarios.Add(admin);
        await db.SaveChangesAsync();

        Console.WriteLine($"Admin padrão criado com sucesso. Email: {admin.Email}, Senha: {senhaPadrao}");
    }
    else
    {
        Console.WriteLine("Admin já existe. Nenhuma ação necessária.");
    }
}

app.Run();
