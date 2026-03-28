import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  try {
    const response = await axios.post(`${API_URL}/analyze-resume`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Failed to analyze resume');
    }
    throw new Error('Network error. Please try again.');
  }
};
