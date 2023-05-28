import axios, { AxiosHeaders } from 'axios';
import { environment } from '../environment';

const instance = axios.create({
    baseURL: environment.baseApiUrl,
});

instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem(environment.tokenKey);

    (config.headers as AxiosHeaders).set('Authorization', `$Bearer ${token}`);

    return config;
});

export { instance };
