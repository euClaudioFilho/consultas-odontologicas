import axios from "axios";

const BASE_URL = "http://localhost:5112";

const dentistaService = {
  getDentistas: async () => {
    const response = await axios.get(`${BASE_URL}/dentistas`);
    return response.data;
  },
  addDentista: async (dentista) => {
    const response = await axios.post(`${BASE_URL}/dentistas`, dentista);
    return response.data;
  },
  updateDentista: async (id, dentista) => {
    const response = await axios.put(`${BASE_URL}/dentistas/${id}`, dentista);
    return response.data;
  },
  deleteDentista: async (id) => {
    await axios.delete(`${BASE_URL}/dentistas/${id}`);
  },
};

export default dentistaService;
