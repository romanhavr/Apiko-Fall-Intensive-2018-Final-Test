import axios from 'axios';

let _token = null;

export const removeToken = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common.Authorization = null;
}

export const setToken = (token) => {
    _token = token;

    localStorage.setItem('token', token);
    
    axios.defaults.headers.common.Authorization = _token
    ? `Bearer ${_token}`
    : null;
}

export const isAuthenticated = () => !!_token;

export const initApi = () => {
    const token = localStorage.getItem('token');
    _token = token;
    setToken(token);
} 

export const Products = {
    fetchProducts() {
        return axios.get(`/api/v2/products`);
    }
}

export const Auth = {
    login(body) {
        return axios.post('api/v2/auth/login', body);
    }
}

export const User = {
    getCurrent() {
        return axios.get('/api/v2/users/current');
    },
}