import axios from 'axios';

const API_URL = 'http://localhost:8080/ingredients';

const getIngredients = (params) => {
    return axios.get(API_URL, { params });
};

const getIngredient = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createIngredient = (ingredient) => {
    return axios.post(API_URL, ingredient);
};

const updateIngredient = (id, ingredient) => {
    return axios.put(`${API_URL}/${id}`, ingredient);
};

const deleteIngredient = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const IngredientService = {
    getIngredients,
    getIngredient,
    createIngredient,
    updateIngredient,
    deleteIngredient,
};

export default IngredientService;
