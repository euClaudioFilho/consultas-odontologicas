import axios from "axios";

const API_URL = "http://localhost:5255/api/Auth";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    throw new Error(error.response.data.message || "Erro ao registrar usuário.");
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { token } = response.data;

    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error(error.response.data);
    throw new Error(error.response.data.message || "Erro ao realizar login.");
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
