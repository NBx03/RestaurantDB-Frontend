import axios from 'axios';

const API_URL = 'http://localhost:8080/waiters';

const getWaiters = (params) => {
    return axios.get(API_URL, { params });
};

const getWaiter = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createWaiter = (waiter) => {
    return axios.post(API_URL, waiter);
};

const updateWaiter = (id, waiter) => {
    return axios.put(`${API_URL}/${id}`, waiter);
};

const deleteWaiter = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const WaiterService = {
    getWaiters,
    getWaiter,
    createWaiter,
    updateWaiter,
    deleteWaiter,
};

export default WaiterService;
