import axios from 'axios';

const API_URL = 'http://localhost:8080/bills';

const getBills = (params) => {
    return axios.get(API_URL, { params });
};

const getBill = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

const createBill = (bill) => {
    bill.issuedAt = new Date().toISOString();
    return axios.post(API_URL, bill);
};

const updateBill = (id, bill) => {
    bill.issuedAt = new Date().toISOString();
    return axios.put(`${API_URL}/${id}`, bill);
};

const deleteBill = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const BillService = {
    getBills,
    getBill,
    createBill,
    updateBill,
    deleteBill,
};

export default BillService;
