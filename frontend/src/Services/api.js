import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Predicts whether a credit card transaction is fraudulent or legitimate.
 * @param {Object} transactionData - Object containing Time, Amount, V1..V28
 * @returns {Promise<Object>} { prediction, result, confidence }
 */
export const predictTransaction = async (transactionData) => {
  try {
    const response = await apiClient.post('/predict', transactionData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.detail || 'Server rejected the request.');
    } else if (error.request) {
      throw new Error('Unable to connect to the AI server. Please make sure the FastAPI backend is running on http://127.0.0.1:8000.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
};

export default apiClient;