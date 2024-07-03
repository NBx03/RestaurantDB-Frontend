import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import RecipeService from '../../services/RecipeService';

const RecipeDelete = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        RecipeService.getRecipe(id).then(response => {
            setRecipe(response.data);
        });
    }, [id]);

    const handleDelete = () => {
        RecipeService.deleteRecipe(id).then(() => {
            navigate('/recipes');
        });
    };

    if (!recipe) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Delete Recipe</Typography>
            <Typography variant="h6">Are you sure you want to delete this recipe?</Typography>
            <Typography variant="h6">Name: {recipe.recipeName}</Typography>
            <Typography variant="h6">Preparation Time: {recipe.preparationTime} minutes</Typography>
            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
            <Button variant="contained" onClick={() => navigate('/recipes')}>Cancel</Button>
        </Container>
    );
};

export default RecipeDelete;
