// API Configuration
export const API_BASE_URL = 'http://localhost:3000';

// API Endpoints
export const API_ENDPOINTS = {
  NEWS: `${API_BASE_URL}/news`,
  CATEGORIES: `${API_BASE_URL}/categories`,
  NEWS_BY_ID: (id) => `${API_BASE_URL}/news/${id}`,
  // Editor endpoints
  CREATE_NEWS: `${API_BASE_URL}/news`,
  UPDATE_NEWS: (id) => `${API_BASE_URL}/news/${id}`,
  DELETE_NEWS: (id) => `${API_BASE_URL}/news/${id}`
};