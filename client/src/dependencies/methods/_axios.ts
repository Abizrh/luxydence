import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()
const accessToken: any = (localStorage.getItem('max.auth'));

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

// request interceptor
api.interceptors.request.use(
    (config: any) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${authStore?.getToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
