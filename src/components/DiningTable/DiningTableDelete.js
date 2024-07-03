import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import DiningTableService from '../../services/DiningTableService';

const DiningTableDelete = () => {
    const { id } = useParams();
    const [diningTable, setDiningTable] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        DiningTableService.getDiningTable(id).then(response => {
            setDiningTable(response.data);
        });
    }, [id]);

    const handleDelete = () => {
        DiningTableService.deleteDiningTable(id).then(() => {
            navigate('/dining-tables');
        });
    };

    if (!diningTable) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Delete Dining Table</Typography>
            <Typography variant="h6">Are you sure you want to delete this dining table?</Typography>
            <Typography variant="h6">Number: {diningTable.number}</Typography>
            <Typography variant="h6">Capacity: {diningTable.capacity}</Typography>
            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
            <Button variant="contained" onClick={() => navigate('/dining-tables')}>Cancel</Button>
        </Container>
    );
};

export default DiningTableDelete;
