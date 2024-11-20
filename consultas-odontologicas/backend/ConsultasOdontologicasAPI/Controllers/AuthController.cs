using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ConsultasOdontologicasAPI.Data;
using ConsultasOdontologicasAPI.Models.DTOs;
using ConsultasOdontologicasAPI.Models;

namespace ConsultasOdontologicasAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDTO dto)
        {
            if (_context.Usuarios.Any(u => u.Email == dto.Email))
            {
                return BadRequest(new { message = "Email já está em uso." });
            }

            if (string.IsNullOrWhiteSpace(dto.Nome) ||
                string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.Senha) ||
                string.IsNullOrWhiteSpace(dto.TipoUsuario))
            {
                return BadRequest(new { message = "Todos os campos são obrigatórios." });
            }

            var usuario = new Usuario
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
                TipoUsuario = dto.TipoUsuario
            };

            _context.Usuarios.Add(usuario);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Register), new { id = usuario.Id }, new { message = "Usuário registrado com sucesso!" });
        }
    }
}