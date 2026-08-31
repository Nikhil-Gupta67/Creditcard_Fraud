import axios from 'axios';

const API_BASE_URL = '[http://127.0.0.1:8000](http://127.0.0.1:8000)';

export const analyzeTransaction = async (transactionPayload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, transactionPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Backend Response Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error - Is FastAPI running?:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};