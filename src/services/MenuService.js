import axios from 'axios';

const API_URL = 'http://localhost:8080/menus';

const getMenus = (params) => {
    return axios.get(API_URL, { params });
};

const getMenu = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createMenu = (menu) => {
    return axios.post(API_URL, menu);
};

const updateMenu = (id, menu) => {
    return axios.put(`${API_URL}/${id}`, menu);
};

const deleteMenu = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const MenuService = {
    getMenus,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu,
};

export default MenuService;
