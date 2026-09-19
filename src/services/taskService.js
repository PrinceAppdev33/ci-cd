import api from './api';

const taskService = {
  getTasks: (params = {}) => api.get('/tasks', { params }),
  getTask: (id) => api.get(`/tasks/${id}`),
  createTask: (data) => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  toggleTask: (id) => api.patch(`/tasks/${id}/toggle`),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export default taskService;
