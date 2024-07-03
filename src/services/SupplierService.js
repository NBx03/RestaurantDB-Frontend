import axios from 'axios';

const API_URL = 'http://localhost:8080/suppliers';

const getSuppliers = (params) => {
    return axios.get(API_URL, { params });
};

const getSupplier = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createSupplier = (supplier) => {
    return axios.post(API_URL, supplier);
};

const updateSupplier = (id, supplier) => {
    return axios.put(`${API_URL}/${id}`, supplier);
};

const deleteSupplier = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const SupplierService = {
    getSuppliers,
    getSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier,
};

export default SupplierService;
