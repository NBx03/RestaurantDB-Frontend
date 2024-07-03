import axios from 'axios';

const API_URL = 'http://localhost:8080/recipes';

const getRecipes = (params) => {
    return axios.get(API_URL, { params });
};

const getRecipe = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createRecipe = (recipe) => {
    return axios.post(API_URL, recipe);
};

const updateRecipe = (id, recipe) => {
    return axios.put(`${API_URL}/${id}`, recipe);
};

const deleteRecipe = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const getRecipesByDishId = (dishId) => {
    return axios.get(`${API_URL}/by-dish/${dishId}`);
};

const RecipeService = {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipesByDishId,
};

export default RecipeService;
