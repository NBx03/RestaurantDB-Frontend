import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import IngredientService from '../../services/IngredientService';

const IngredientDetail = () => {
    const { id } = useParams();
    const [ingredient, setIngredient] = useState(null);

    useEffect(() => {
        IngredientService.getIngredient(id).then(response => {
            setIngredient(response.data);
        });
    }, [id]);

    if (!ingredient) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Ingredient Detail</Typography>
            <Typography variant="h6">Name: {ingredient.name}</Typography>
            <Typography variant="h6">Description: {ingredient.description}</Typography>
            <Typography variant="h6">Stock Quantity: {ingredient.stockQuantity}</Typography>
            <Button variant="contained" color="primary" component={Link} to="/ingredients">Back to List</Button>
        </Container>
    );
};

export default IngredientDetail;
