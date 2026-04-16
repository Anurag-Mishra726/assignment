import api from "../utils/api";

export const taskApi = {

  createTask: async (data) => {
    const response = await api.post('/tasks', data);
    return response.data.data;
  },

  listTasks: async () => {
    const response = await api.get('/tasks');
    return response.data.data;
  },

  updateTask: async (id, data) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};
