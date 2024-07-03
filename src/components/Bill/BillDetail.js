import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import BillService from '../../services/BillService';

const BillDetail = () => {
    const { id } = useParams();
    const [bill, setBill] = useState(null);

    useEffect(() => {
        BillService.getBill(id).then(response => {
            setBill(response.data);
        });
    }, [id]);

    if (!bill) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Bill Detail</Typography>
            <Typography variant="h6">ID: {bill.id}</Typography>
            <Typography variant="h6">Total Amount: {bill.totalAmount}</Typography>
            <Typography variant="h6">Issued At: {new Date(bill.issuedAt).toLocaleString()}</Typography>
            <Typography variant="h6">Client: {bill.clientName} {bill.clientSurname}</Typography>
            <Button variant="contained" color="primary" component={Link} to="/bills">Back to List</Button>
        </Container>
    );
};

export default BillDetail;
