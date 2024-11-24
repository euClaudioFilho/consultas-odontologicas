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
      if (!dentistaId) {
        throw new Error("ID do dentista é obrigatório.");
      }
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

  atualizarStatusConsulta: async (consultaId, novoStatus, dentistaId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/consultas/${consultaId}/status?novoStatus=${encodeURIComponent(
          novoStatus
        )}&dentistaId=${dentistaId}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar status da consulta:", error);
      throw error;
    }
  },
  
  updateStatusConsulta: async (consultaId, novoStatus) => {
    try {
      const response = await axios.put(`${BASE_URL}/consultas/${consultaId}/status`, {
        status: novoStatus,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar o status da consulta:", error);
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

  getTotalConsultas: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/consultas/total`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar total de consultas:", error);
      throw error;
    }
  },
  
  getTotalPacientes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/pacientes/total`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar total de pacientes:", error);
      throw error;
    }
  },
  
  getTotalDentistas: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/dentistas/total`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar total de dentistas:", error);
      throw error;
    }
  },
};

export default consultaService;
