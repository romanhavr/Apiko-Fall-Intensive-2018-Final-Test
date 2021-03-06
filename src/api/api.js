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
        return axios.get(`/api/v3/products`);
    },
    editProduct(id, body) {
      return axios.patch(`/api/v3/products/${id}`, body)
    },
    deleteProduct(id){
      return axios.delete(`/api/v3/products/${id}`)
    },
    addProduct(body) {
      return axios.post(`/api/v3/products`, body)
    }
}

export const Auth = {
    login(body) {
        return axios.post('/api/v3/auth/login', body);
    },
    register(body) {
        return axios.post('/api/v3/auth/register', body)
    }
}

export const User = {
    getCurrent() {
        return axios.get('/api/v3/users/current',);
    },
}