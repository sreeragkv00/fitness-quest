import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  refreshToken: () => api.post('/auth/refresh')
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
  getStats: () => api.get('/users/me/stats'),
  getLeaderboard: (limit = 50, offset = 0) => 
    api.get('/users/leaderboard', { params: { limit, offset } })
};

// Workout API
export const workoutAPI = {
  create: (data) => api.post('/workouts', data),
  getAll: (query) => api.get('/workouts', { params: query }),
  getById: (id) => api.get(`/workouts/${id}`),
  update: (id, data) => api.put(`/workouts/${id}`, data),
  delete: (id) => api.delete(`/workouts/${id}`)
};

// Quest API
export const questAPI = {
  getDaily: () => api.get('/quests/daily'),
  getAll: (query) => api.get('/quests', { params: query }),
  complete: (questId) => api.post(`/quests/${questId}/complete`),
  skip: (questId) => api.post(`/quests/${questId}/skip`)
};

// Achievement API
export const achievementAPI = {
  getAll: () => api.get('/achievements'),
  getUnlocked: () => api.get('/achievements/user/unlocked')
};

// Guild API
export const guildAPI = {
  create: (data) => api.post('/guilds', data),
  getById: (id) => api.get(`/guilds/${id}`),
  getMyGuild: () => api.get('/guilds/my-guild'),
  join: (guildId) => api.post(`/guilds/${guildId}/join`),
  leave: (guildId) => api.post(`/guilds/${guildId}/leave`),
  getLeaderboard: (guildId) => api.get(`/guilds/${guildId}/leaderboard`)
};

// Nutrition API
export const nutritionAPI = {
  logMeal: (data) => api.post('/nutrition/log', data),
  getLogs: (query) => api.get('/nutrition/logs', { params: query }),
  getDailySummary: (date) => api.get('/nutrition/daily-summary', { params: { date } })
};

export default api;
