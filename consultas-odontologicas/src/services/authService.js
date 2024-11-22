import axios from "axios";

const BASE_URL = "http://localhost:5112";

const authService = {
  login: async (email, senha) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { email, senha });

      const token = response.data.token;
      const payload = JSON.parse(atob(token.split(".")[1])); 

      const usuario = {
        token,
        pacienteId: response.data.pacienteId || null,
        dentistaId: response.data.dentistaId || null,
        tipo: payload.role || "Desconhecido",
        nome: response.data.nome,
      };

      localStorage.setItem("usuario", JSON.stringify(usuario));
      return usuario;
    } catch (error) {
      console.error("Erro no login:", error.response?.data || error.message);
      throw error;
    }
  },

  register: async (dadosUsuario) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, dadosUsuario);
      return response.data;
    } catch (error) {
      console.error("Erro no registro:", error.response?.data || error.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.clear();
  },

  getUsuario: () => {
    const usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario) : null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
};

export default authService;
