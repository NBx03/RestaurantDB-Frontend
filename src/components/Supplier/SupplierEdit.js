import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import SupplierService from '../../services/SupplierService';

const SupplierEdit = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        SupplierService.getSupplier(id).then(response => {
            const supplier = response.data;
            setName(supplier.name);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedSupplier = { name };
        SupplierService.updateSupplier(id, updatedSupplier).then(() => {
            navigate('/suppliers');
        });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Edit Supplier</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary">Update</Button>
            </form>
        </Container>
    );
};

export default SupplierEdit;
