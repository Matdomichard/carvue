import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    },
});

// Ajouter un intercepteur pour gérer les erreurs
instance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const axiosInstance = instance;
