import axios from 'axios';

// ✅ Dynamically use backend URL from environment variables
const API_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/api/expenses`;

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getExpenses = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch expenses');
  }
};

export const addExpense = async (expense) => {
  try {
    const response = await api.post('/', expense);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to add expense');
  }
};

export const deleteExpense = async (id) => {
  try {
    await api.delete(`/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete expense');
  }
};
