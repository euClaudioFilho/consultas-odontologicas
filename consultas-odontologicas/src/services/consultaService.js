import axios from "axios";

const BASE_URL = "http://localhost:5112"; 

const consultaService = {
  getConsultasPaciente: async (pacienteId) => {
    try {
      const response = await axios.get(`${BASE_URL}/consultas/paciente/${pacienteId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar consultas do paciente:", error);
      throw error;
    }
  },

  getConsultasDentista: async (dentistaId) => {
    try {
      const response = await axios.get(`${BASE_URL}/consultas/dentista/${dentistaId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar consultas do dentista:", error);
      throw error;
    }
  },

  agendarConsulta: async (consulta) => {
    try {
      const response = await axios.post(`${BASE_URL}/consultas`, consulta);
      return response.data;
    } catch (error) {
      console.error("Erro ao agendar consulta:", error);
      if (error.response && error.response.data) {
        console.error("Erro do servidor:", error.response.data);
      }
      throw error;
    }
  },

  atualizarConsulta: async (consultaId, consultaAtualizada) => {
    try {
      const response = await axios.put(`${BASE_URL}/consultas/${consultaId}`, consultaAtualizada);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar consulta:", error);
      throw error;
    }
  },

  excluirConsulta: async (consultaId, dentistaId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/consultas/${consultaId}`, {
        data: { dentistaId },
      });
      return response.status === 204; 
    } catch (error) {
      console.error("Erro ao excluir consulta:", error);
      throw error;
    }
  },
};

export default consultaService;
