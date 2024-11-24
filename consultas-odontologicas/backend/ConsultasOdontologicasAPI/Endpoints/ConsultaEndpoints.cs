using System.Text.Json;
using ConsultasOdontologicasAPI.Data;
using ConsultasOdontologicasAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ConsultasOdontologicasAPI.Endpoints
{
    public static class ConsultaEndpoints
    {
        public static void MapConsultaEndpoints(this WebApplication app)
        {
            app.MapPost("/consultas", async (AppDbContext db, Consulta consulta) =>
            {
                if (consulta.PacienteId <= 0 || consulta.DentistaId <= 0)
                    return Results.BadRequest("IDs de Paciente e Dentista são obrigatórios e devem ser válidos.");

                if (string.IsNullOrWhiteSpace(consulta.Descricao))
                    return Results.BadRequest("A descrição da consulta é obrigatória.");

                db.Consultas.Add(consulta);
                await db.SaveChangesAsync();
                return Results.Created($"/consultas/{consulta.Id}", consulta);
            });


            app.MapGet("/consultas/paciente/{pacienteId}", async (AppDbContext db, int pacienteId) =>
            {
                var consultas = await db.Consultas
                    .Where(c => c.PacienteId == pacienteId)
                    .ToListAsync();
                return Results.Ok(consultas);
            });

            app.MapGet("/consultas/dentista/{dentistaId}", async (AppDbContext db, int dentistaId) =>
            {
                var consultas = await db.Consultas
                    .Where(c => c.DentistaId == dentistaId)
                    .ToListAsync();
                return Results.Ok(consultas);
            });

            app.MapPut("/consultas/{id}", async (AppDbContext db, int id, Consulta consultaAtualizada, int usuarioId, string role) =>
            {
                var consulta = await db.Consultas.FindAsync(id);
                if (consulta == null)
                    return Results.NotFound();

                if (role == "Paciente" && consulta.PacienteId != usuarioId)
                    return Results.Forbid();

                if (role == "Dentista" && consulta.DentistaId != usuarioId)
                    return Results.Forbid();

                consulta.DataHora = consultaAtualizada.DataHora;
                consulta.Descricao = consultaAtualizada.Descricao;

                await db.SaveChangesAsync();
                return Results.Ok(consulta);
            });

            app.MapDelete("/consultas/{id}", async (AppDbContext db, int id, int dentistaId) =>
            {
                var consulta = await db.Consultas
                    .Where(c => c.Id == id && c.DentistaId == dentistaId)
                    .FirstOrDefaultAsync();

                if (consulta == null)
                    return Results.NotFound();

                db.Consultas.Remove(consulta);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }
}
