import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import WaiterService from '../../services/WaiterService';

const WaiterDelete = () => {
    const { id } = useParams();
    const [waiter, setWaiter] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        WaiterService.getWaiter(id).then(response => {
            setWaiter(response.data);
        });
    }, [id]);

    const handleDelete = () => {
        WaiterService.deleteWaiter(id).then(() => {
            navigate('/waiters');
        });
    };

    if (!waiter) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Delete Waiter</Typography>
            <Typography variant="h6">Are you sure you want to delete this waiter?</Typography>
            <Typography variant="h6">Name: {waiter.name}</Typography>
            <Typography variant="h6">Surname: {waiter.surname}</Typography>
            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
            <Button variant="contained" onClick={() => navigate('/waiters')}>Cancel</Button>
        </Container>
    );
};

export default WaiterDelete;
