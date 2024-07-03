import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import DiningTableService from '../../services/DiningTableService';

const DiningTableEdit = () => {
    const { id } = useParams();
    const [number, setNumber] = useState('');
    const [capacity, setCapacity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        DiningTableService.getDiningTable(id).then(response => {
            const diningTable = response.data;
            setNumber(diningTable.number);
            setCapacity(diningTable.capacity);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedDiningTable = { number, capacity };
        DiningTableService.updateDiningTable(id, updatedDiningTable).then(() => {
            navigate('/dining-tables');
        });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Edit Dining Table</Typography>
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
                <Button type="submit" variant="contained" color="primary">Update</Button>
            </form>
        </Container>
    );
};

export default DiningTableEdit;
