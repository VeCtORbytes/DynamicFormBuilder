import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5050/api'
});

// Template functions
export const getTemplates = () => API.get('/templates');
export const getTemplate = (id) => API.get(`/templates/${id}`);
export const createTemplate = (data) => API.post('/templates', data);
export const updateTemplate = (id, data) => API.put(`/templates/${id}`, data);
export const deleteTemplate = (id) => API.delete(`/templates/${id}`);

// Submission functions
export const submitForm = (data) => API.post('/submissions', data);
export const getSubmissions = (templateId) => API.get(`/submissions/template/${templateId}`);

export default API;