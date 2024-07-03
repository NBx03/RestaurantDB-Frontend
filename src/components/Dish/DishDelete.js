import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import DishService from '../../services/DishService';

const DishDelete = () => {
    const { id } = useParams();
    const [dish, setDish] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        DishService.getDish(id).then(response => {
            setDish(response.data);
        });
    }, [id]);

    const handleDelete = () => {
        DishService.deleteDish(id).then(() => {
            navigate('/dishes');
        });
    };

    if (!dish) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Delete Dish</Typography>
            <Typography variant="h6">Are you sure you want to delete this dish?</Typography>
            <Typography variant="h6">Name: {dish.name}</Typography>
            <Typography variant="h6">Description: {dish.description}</Typography>
            <Typography variant="h6">Price: {dish.price}</Typography>
            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
            <Button variant="contained" onClick={() => navigate('/dishes')}>Cancel</Button>
        </Container>
    );
};

export default DishDelete;
