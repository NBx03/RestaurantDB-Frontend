import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import SupplierService from '../../services/SupplierService';

const SupplierDelete = () => {
    const { id } = useParams();
    const [supplier, setSupplier] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        SupplierService.getSupplier(id).then(response => {
            setSupplier(response.data);
        });
    }, [id]);

    const handleDelete = () => {
        SupplierService.deleteSupplier(id).then(() => {
            navigate('/suppliers');
        });
    };

    if (!supplier) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Delete Supplier</Typography>
            <Typography variant="h6">Are you sure you want to delete this supplier?</Typography>
            <Typography variant="h6">Name: {supplier.name}</Typography>
            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
            <Button variant="contained" onClick={() => navigate('/suppliers')}>Cancel</Button>
        </Container>
    );
};

export default SupplierDelete;
