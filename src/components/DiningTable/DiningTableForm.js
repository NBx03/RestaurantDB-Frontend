import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import DiningTableService from '../../services/DiningTableService';

const DiningTableForm = () => {
    const [number, setNumber] = useState('');
    const [capacity, setCapacity] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDiningTable = { number, capacity };
        DiningTableService.createDiningTable(newDiningTable).then(() => {
            navigate('/dining-tables');
        });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Add Dining Table</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary">Save</Button>
            </form>
        </Container>
    );
};

export default DiningTableForm;
