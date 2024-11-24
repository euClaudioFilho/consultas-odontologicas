import axios from "axios";

const API_URL = "http://localhost:5112"; 

const pacienteService = {
  async getPacientes() {
    const response = await axios.get(`${API_URL}/pacientes`);
    return response.data;
  },

  async addPaciente(novoPaciente) {
    const response = await axios.post(`${API_URL}/pacientes`, novoPaciente);
    return response.data;
  },

  async updatePaciente(id, pacienteAtualizado) {
    const response = await axios.put(`${API_URL}/pacientes/${id}`, pacienteAtualizado);
    return response.data;
  },

  async deletePaciente(id) {
    await axios.delete(`${API_URL}/pacientes/${id}`);
  },
};

export default pacienteService;
