// API configuration
const getApiUrl = () => {
  // Use environment variable if available, otherwise fallback to production URL
  return import.meta.env.VITE_API_URL || 'https://test-me-wv1b.onrender.com';
};

export const API_CONFIG = {
  BASE_URL: getApiUrl(),
  ENDPOINTS: {
    AUTH: {
      SIGNUP: '/auth/signup',
      LOGIN: '/auth/login',
    },
    QUESTIONS: {
      GENERATE: '/questions/generate-questions',
    },
    TEST: {
      SUBMIT: '/test/submit-test',
      GET_RESULT: '/test/getTestResult',
      GET_HISTORY: '/test/getUserTestHistory',
    },
    USER: {
      GET_DATA: '/user/getUserData',
    },
  },
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export default API_CONFIG;