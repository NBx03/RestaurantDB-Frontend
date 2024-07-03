import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import BillService from '../../services/BillService';

const BillDelete = () => {
    const { id } = useParams();
    const [bill, setBill] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        BillService.getBill(id).then(response => {
            setBill(response.data);
        });
    }, [id]);

    const handleDelete = () => {
        BillService.deleteBill(id).then(() => {
            navigate('/bills');
        });
    };

    if (!bill) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Delete Bill</Typography>
            <Typography variant="h6">Are you sure you want to delete this bill?</Typography>
            <Typography variant="h6">ID: {bill.id}</Typography>
            <Typography variant="h6">Total Amount: {bill.totalAmount}</Typography>
            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
            <Button variant="contained" onClick={() => navigate('/bills')}>Cancel</Button>
        </Container>
    );
};

export default BillDelete;
