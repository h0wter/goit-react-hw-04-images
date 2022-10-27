import axios from 'axios';
import { toast } from 'react-toastify';

const API_KEY = '27001286-6f78b2bfddf63080b94e291b1';
axios.defaults.baseURL = `https://pixabay.com/api`;

export const getImages = async (query, page) => {
  try {
    const response = await axios.get(
      `?key=${API_KEY}&per_page=12&q=${query}&page=${page}`
    );
    return response.data;
  } catch {
    toast.error('Something went wrong, please try again!');
  }
};
