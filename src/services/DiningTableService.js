import axios from 'axios';

const API_URL = 'http://localhost:8080/dining-tables';

const getDiningTables = (params) => {
    return axios.get(API_URL, { params });
};

const getDiningTable = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createDiningTable = (diningTable) => {
    return axios.post(API_URL, diningTable);
};

const updateDiningTable = (id, diningTable) => {
    return axios.put(`${API_URL}/${id}`, diningTable);
};

const deleteDiningTable = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const DiningTableService = {
    getDiningTables,
    getDiningTable,
    createDiningTable,
    updateDiningTable,
    deleteDiningTable,
};

export default DiningTableService;
