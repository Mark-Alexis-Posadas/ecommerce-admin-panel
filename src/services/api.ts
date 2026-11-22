import axios from "axios";
export const TOKEN_KEY = "shopzone.admin.token";
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
api.interceptors.request.use(config => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token)
        config.headers.Authorization = 'Bearer ' + token;
    return config;
});
api.interceptors.response.use(response => response, error => {
    if (axios.isAxiosError(error) && error.response?.status === 401 && error.config?.url !== '/api/auth/login' && error.config?.headers.Authorization === 'Bearer ' + localStorage.getItem(TOKEN_KEY))
        window.dispatchEvent(new Event('shopzone:session-expired'));
    return Promise.reject(error);
});
