import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import SupplierService from '../../services/SupplierService';

const SupplierForm = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSupplier = { name };
        SupplierService.createSupplier(newSupplier).then(() => {
            navigate('/suppliers');
        });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Add Supplier</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary">Save</Button>
            </form>
        </Container>
    );
};

export default SupplierForm;
    