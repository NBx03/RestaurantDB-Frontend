import axios from 'axios';

const API_URL = 'http://localhost:8080/clients';

const getClients = (params) => {
    return axios.get(API_URL, { params });
};

const getClient = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createClient = (client) => {
    return axios.post(API_URL, client);
};

const updateClient = (id, client) => {
    return axios.put(`${API_URL}/${id}`, client);
};

const deleteClient = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const getClientBills = (clientId) => {
    return axios.get(`${API_URL}/${clientId}/bills`);
};

const ClientService = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
    getClientBills,
};

export default ClientService;
