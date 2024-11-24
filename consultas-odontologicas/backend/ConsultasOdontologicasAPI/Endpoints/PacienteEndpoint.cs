using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ConsultasOdontologicasAPI.Data;
using ConsultasOdontologicasAPI.Models;

namespace ConsultasOdontologicasAPI.Endpoints
{
    public static class PacienteEndpoints
    {
        public static void MapPacienteEndpoints(this WebApplication app)
        {
            app.MapPost("/pacientes", async (AppDbContext db, Usuario paciente) =>
            {
                if (await db.Usuarios.AnyAsync(u => u.Email == paciente.Email))
                {
                    return Results.BadRequest("Email já está cadastrado.");
                }

                paciente.Role = "Paciente";

                using var sha256 = SHA256.Create();
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(paciente.Senha));
                paciente.Senha = Convert.ToBase64String(hashedBytes);

                db.Usuarios.Add(paciente);
                await db.SaveChangesAsync();

                return Results.Created($"/pacientes/{paciente.Id}", new { paciente.Id, paciente.Nome, paciente.Email });
            });

            app.MapGet("/pacientes", async (AppDbContext db) =>
            {
                var pacientes = await db.Usuarios
                    .Where(u => u.Role == "Paciente")
                    .Select(u => new { u.Id, u.Nome, u.Email })
                    .ToListAsync();

                return Results.Ok(pacientes);
            });

            app.MapGet("/pacientes/{id:int}", async (AppDbContext db, int id) =>
            {
                var paciente = await db.Usuarios.FirstOrDefaultAsync(u => u.Id == id && u.Role == "Paciente");

                if (paciente == null)
                {
                    return Results.NotFound("Paciente não encontrado.");
                }

                return Results.Ok(new { paciente.Id, paciente.Nome, paciente.Email });
            });

            app.MapPut("/pacientes/{id:int}", async (AppDbContext db, int id, Usuario pacienteAtualizado) =>
            {
                var paciente = await db.Usuarios.FirstOrDefaultAsync(u => u.Id == id && u.Role == "Paciente");

                if (paciente == null)
                {
                    return Results.NotFound("Paciente não encontrado.");
                }

                paciente.Nome = pacienteAtualizado.Nome;
                paciente.Email = pacienteAtualizado.Email;

                if (!string.IsNullOrEmpty(pacienteAtualizado.Senha))
                {
                    using var sha256 = SHA256.Create();
                    var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(pacienteAtualizado.Senha));
                    paciente.Senha = Convert.ToBase64String(hashedBytes);
                }

                await db.SaveChangesAsync();

                return Results.Ok(new { paciente.Id, paciente.Nome, paciente.Email });
            });

            app.MapDelete("/pacientes/{id:int}", async (AppDbContext db, int id) =>
            {
                var paciente = await db.Usuarios.FirstOrDefaultAsync(u => u.Id == id && u.Role == "Paciente");

                if (paciente == null)
                {
                    return Results.NotFound("Paciente não encontrado.");
                }

                db.Usuarios.Remove(paciente);
                await db.SaveChangesAsync();

                return Results.NoContent();
            });

            app.MapGet("/pacientes/total", async (AppDbContext db) =>
            {
                var totalPacientes = await db.Usuarios.CountAsync(u => u.Role == "Paciente");
                return Results.Ok(totalPacientes);
            });

        }
    }
}
