using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsultasOdontologicasAPI.Models
{
    public class Consulta
    {
        public int Id { get; set; }
        public string Paciente { get; set; }
        public string Dentista { get; set; }
        public DateTime Data { get; set; }
        public string Horario { get; set; }
        public string Status { get; set; }
    }
}