using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ConsultasOdontologicasAPI.Data;
using ConsultasOdontologicasAPI.Models;

namespace ConsultasOdontologicasAPI.Endpoints
{
    public static class DentistaEndpoints
    {
        public static void MapDentistaEndpoints(this WebApplication app)
        {
            app.MapPost("/dentistas", async (AppDbContext db, Usuario dentista) =>
            {
                if (await db.Usuarios.AnyAsync(u => u.Email == dentista.Email))
                {
                    return Results.BadRequest("Email já está cadastrado.");
                }

                dentista.Role = "Dentista";

                using var sha256 = SHA256.Create();
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(dentista.Senha));
                dentista.Senha = Convert.ToBase64String(hashedBytes);

                db.Usuarios.Add(dentista);
                await db.SaveChangesAsync();

                return Results.Created($"/dentistas/{dentista.Id}", new { dentista.Id, dentista.Nome, dentista.Email });
            });

            app.MapGet("/dentistas", async (AppDbContext db) =>
            {
                var dentistas = await db.Usuarios
                    .Where(u => u.Role == "Dentista")
                    .Select(u => new { u.Id, u.Nome, u.Email })
                    .ToListAsync();

                return Results.Ok(dentistas);
            });

            app.MapGet("/dentistas/{id:int}", async (AppDbContext db, int id) =>
            {
                var dentista = await db.Usuarios.FirstOrDefaultAsync(u => u.Id == id && u.Role == "Dentista");

                if (dentista == null)
                {
                    return Results.NotFound("Dentista não encontrado.");
                }

                return Results.Ok(new { dentista.Id, dentista.Nome, dentista.Email });
            });

            app.MapPut("/dentistas/{id:int}", async (AppDbContext db, int id, Usuario dentistaAtualizado) =>
            {
                var dentista = await db.Usuarios.FirstOrDefaultAsync(u => u.Id == id && u.Role == "Dentista");

                if (dentista == null)
                {
                    return Results.NotFound("Dentista não encontrado.");
                }

                dentista.Nome = dentistaAtualizado.Nome;
                dentista.Email = dentistaAtualizado.Email;

                if (!string.IsNullOrEmpty(dentistaAtualizado.Senha))
                {
                    using var sha256 = SHA256.Create();
                    var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(dentistaAtualizado.Senha));
                    dentista.Senha = Convert.ToBase64String(hashedBytes);
                }

                await db.SaveChangesAsync();

                return Results.Ok(new { dentista.Id, dentista.Nome, dentista.Email });
            });

            app.MapDelete("/dentistas/{id:int}", async (AppDbContext db, int id) =>
            {
                var dentista = await db.Usuarios.FirstOrDefaultAsync(u => u.Id == id && u.Role == "Dentista");

                if (dentista == null)
                {
                    return Results.NotFound("Dentista não encontrado.");
                }

                db.Usuarios.Remove(dentista);
                await db.SaveChangesAsync();

                return Results.NoContent();
            });

            app.MapGet("/dentistas/total", async (AppDbContext db) =>
            {
                var totalDentistas = await db.Usuarios.CountAsync(u => u.Role == "Dentista");
                return Results.Ok(totalDentistas);
            });

        }
    }
}
