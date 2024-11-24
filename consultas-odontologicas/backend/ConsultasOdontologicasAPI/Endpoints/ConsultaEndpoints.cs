using System.Text.Json;
using ConsultasOdontologicasAPI.Data;
using ConsultasOdontologicasAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

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

                consulta.Status = "Pendente";
                db.Consultas.Add(consulta);
                await db.SaveChangesAsync();
                return Results.Created($"/consultas/{consulta.Id}", consulta);
            });

            app.MapGet("/consultas/paciente/{pacienteId}", async (AppDbContext db, int pacienteId) =>
            {
                var consultas = await db.Consultas
                    .Where(c => c.PacienteId == pacienteId)
                    .OrderBy(c => c.DataHora)
                    .ToListAsync();
                return Results.Ok(consultas);
            });

            app.MapGet("/consultas/dentista/{dentistaId}", async (AppDbContext db, int dentistaId) =>
            {
                var consultas = await db.Consultas
                    .Where(c => c.DentistaId == dentistaId)
                    .OrderBy(c => c.DataHora)
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

                if (consultaAtualizada.DataHora != null)
                    consulta.DataHora = consultaAtualizada.DataHora;

                if (!string.IsNullOrWhiteSpace(consultaAtualizada.Descricao))
                    consulta.Descricao = consultaAtualizada.Descricao;

                await db.SaveChangesAsync();
                return Results.Ok(consulta);
            });

            app.MapPut("/consultas/{id}/status", async (AppDbContext db, int id, [FromQuery] string novoStatus, [FromQuery] int dentistaId) =>
            {
                if (string.IsNullOrEmpty(novoStatus))
                    return Results.BadRequest("O novo status é obrigatório.");

                var consulta = await db.Consultas.FirstOrDefaultAsync(c => c.Id == id && c.DentistaId == dentistaId);
                if (consulta == null)
                    return Results.NotFound("Consulta não encontrada ou não pertence ao dentista.");

                consulta.Status = novoStatus;
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

            app.MapGet("/consultas/total", async (AppDbContext db) =>
            {
                var totalConsultas = await db.Consultas.CountAsync();
                return Results.Ok(totalConsultas);
            });
        }
    }
}
