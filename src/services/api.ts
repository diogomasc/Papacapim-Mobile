import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
});

// Armazena o token em memória para uso no interceptor
let authToken: string | null = null;

// Define o token de autenticação para as requisições da API
export function setApiToken(token: string | null) {
  authToken = token;
}

// Obtém o token de autenticação atual
export function getApiToken() {
  return authToken;
}

// Interceptor de requisição para anexar o token de autenticação
api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers["x-session-token"] = authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor para tratar erros de forma global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // O servidor respondeu com um status fora do range 2xx
      console.error("API Error Response:", error.response.data);
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      console.error("API No Response:", error.request);
    } else {
      console.error("API Request Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export { api };
