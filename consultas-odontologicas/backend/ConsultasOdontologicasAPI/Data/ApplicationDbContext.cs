using Microsoft.EntityFrameworkCore;
using ConsultasOdontologicasAPI.Models;

namespace ConsultasOdontologicasAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Consulta> Consultas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurações adicionais, se necessário
            modelBuilder.Entity<Usuario>().Property(u => u.TipoUsuario).HasMaxLength(50);
            modelBuilder.Entity<Consulta>().Property(c => c.Status).HasMaxLength(20);
        }
    }
}
