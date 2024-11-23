import axios from "axios";

const API_URL = "http://localhost:5255/api/Auth";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || "Erro ao registrar usuário.");
    throw new Error(error.response?.data?.message || "Erro ao registrar usuário.");
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);

    // Obtém o token e tipoUsuario
    const { token, tipoUsuario } = response.data;

    // Armazena no localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("tipoUsuario", tipoUsuario);

    return { token, tipoUsuario }; // Retorna ambos os dados
  } catch (error) {
    console.error(error.response?.data || "Erro ao realizar login.");
    throw new Error(error.response?.data?.message || "Erro ao realizar login.");
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tipoUsuario");
};
