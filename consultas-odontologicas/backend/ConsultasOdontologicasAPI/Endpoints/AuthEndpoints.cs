using ConsultasOdontologicasAPI.Data;
using ConsultasOdontologicasAPI.Models;
using ConsultasOdontologicasAPI.Services;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace ConsultasOdontologicasAPI.Endpoints
{
    public static class AuthEndpoints
    {
        public static void MapAuthEndpoints(this WebApplication app)
        {
            app.MapPost("/auth/register", async (AppDbContext db, Usuario usuario) =>
            {
                if (await db.Usuarios.AnyAsync(u => u.Email == usuario.Email))
                {
                    return Results.BadRequest("Email já está cadastrado.");
                }

                var rolesValidas = new[] { "Paciente", "Dentista", "Admin" };
                if (!rolesValidas.Contains(usuario.Role))
                {
                    return Results.BadRequest("Role inválida. As roles permitidas são: Paciente, Dentista, Admin.");
                }

                using var sha256 = SHA256.Create();
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(usuario.Senha));
                usuario.Senha = Convert.ToBase64String(hashedBytes);

                db.Usuarios.Add(usuario);
                await db.SaveChangesAsync();
                return Results.Created($"/auth/register/{usuario.Id}", usuario);
            });

            app.MapPost("/auth/login", async (AppDbContext db, LoginRequest request) =>
            {
                Console.WriteLine($"Email recebido: {request.Email}");
                Console.WriteLine($"Senha recebida: {request.Senha}");

                var usuario = await db.Usuarios
                    .FirstOrDefaultAsync(u => u.Email == request.Email);

                if (usuario == null)
                {
                    Console.WriteLine("Usuário não encontrado.");
                    return Results.BadRequest("Usuário ou senha inválidos.");
                }

                using var sha256 = SHA256.Create();
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(request.Senha));
                var hashedSenha = Convert.ToBase64String(hashedBytes);

                if (usuario.Senha != hashedSenha)
                {
                    Console.WriteLine("Senha inválida.");
                    return Results.BadRequest("Usuário ou senha inválidos.");
                }

                var token = TokenService.GenerateToken(usuario.Id, usuario.Role);

                Console.WriteLine($"Login bem-sucedido para usuário: {usuario.Email}");
                return Results.Ok(new
                {
                    token,
                    nome = usuario.Nome,
                    pacienteId = usuario.Role == "Paciente" ? (int?)usuario.Id : null,
                    dentistaId = usuario.Role == "Dentista" ? (int?)usuario.Id : null
                });
            });
        }
    }
}
