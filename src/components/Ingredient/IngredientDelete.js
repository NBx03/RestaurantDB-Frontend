import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import IngredientService from '../../services/IngredientService';

const IngredientDelete = () => {
    const { id } = useParams();
    const [ingredient, setIngredient] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        IngredientService.getIngredient(id).then(response => {
            setIngredient(response.data);
        });
    }, [id]);

    const handleDelete = () => {
        IngredientService.deleteIngredient(id).then(() => {
            navigate('/ingredients');
        });
    };

    if (!ingredient) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Delete Ingredient</Typography>
            <Typography variant="h6">Are you sure you want to delete this ingredient?</Typography>
            <Typography variant="h6">Name: {ingredient.name}</Typography>
            <Typography variant="h6">Description: {ingredient.description}</Typography>
            <Typography variant="h6">Stock Quantity: {ingredient.stockQuantity}</Typography>
            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
            <Button variant="contained" onClick={() => navigate('/ingredients')}>Cancel</Button>
        </Container>
    );
};

export default IngredientDelete;
