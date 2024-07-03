import axios from 'axios';

const API_URL = 'http://localhost:8080/dishes';

const getDishes = (params) => {
    return axios.get(API_URL, { params });
};

const getDish = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createDish = (dish) => {
    return axios.post(API_URL, dish);
};

const updateDish = (id, dish) => {
    return axios.put(`${API_URL}/${id}`, dish);
};

const deleteDish = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const DishService = {
    getDishes,
    getDish,
    createDish,
    updateDish,
    deleteDish,
};

export default DishService;
