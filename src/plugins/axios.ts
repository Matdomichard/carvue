import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://comptearebours.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://zzztracker.site', // Remplacez le domaine par celui de votre front-end

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
