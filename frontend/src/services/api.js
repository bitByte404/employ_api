import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/authSlice';

const api = axios.create({
  baseURL: '/api'
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const userAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
};

export const testAPI = {
  submitPersonalityTest: (data) => api.post('/api/tests/personality', data),
  submitCareerTest: (data) => api.post('/api/tests/career-interest', data),
};

export const recommendationAPI = {
    getSimilar: () => api.get('/recommendations/similar'),
    getCareerPrediction: () => api.get('/recommendations/career-prediction'),
    getComprehensive: () => api.get('/recommendations/comprehensive')
};

export const statisticsAPI = {
  getStatistics: () => api.get('/api/statistics'),
};

export const graduateAPI = {
  searchGraduates: (keyword, page, size) => 
    api.get(`/graduates/search?keyword=${keyword}&page=${page}&size=${size}`),
  createGraduate: (data) => api.post('/graduates', data),
  updateGraduate: (id, data) => api.put(`/graduates/${id}`, data),
  deleteGraduate: (id) => api.delete(`/graduates/${id}`),
};

export const systemAPI = {
  getLogs: (params) => api.get('/system/logs', { params }),
  getSettings: () => api.get('/system/settings'),
  updateSettings: (data) => api.put('/system/settings', data),
  backupData: () => api.post('/system/backup'),
  restoreData: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/system/restore', formData);
  },
};

export default api; 