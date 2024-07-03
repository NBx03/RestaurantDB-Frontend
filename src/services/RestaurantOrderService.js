import axios from 'axios';

const API_URL = 'http://localhost:8080/orders';

const getOrders = (params) => {
    return axios.get(API_URL, { params });
};

const getOrder = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createOrder = (order) => {
    return axios.post(API_URL, order);
};

const updateOrder = (id, order) => {
    return axios.put(`${API_URL}/${id}`, order);
};

const deleteOrder = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const RestaurantOrderService = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
};

export default RestaurantOrderService;
