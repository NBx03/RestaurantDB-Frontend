import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import RecipeService from '../../services/RecipeService';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        RecipeService.getRecipe(id).then(response => {
            setRecipe(response.data);
        });
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Recipe Detail</Typography>
            <Typography variant="h6">Name: {recipe.recipeName}</Typography>
            <Typography variant="h6">Preparation Time: {recipe.preparationTime} minutes</Typography>
            <Typography variant="h5" gutterBottom>Instructions</Typography>
            <List>
                {Object.entries(recipe.instructions).map(([step, instruction]) => (
                    <ListItem key={step}>
                        <ListItemText primary={`${step}: ${instruction}`} />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" component={Link} to="/recipes">Back to List</Button>
        </Container>
    );
};

export default RecipeDetail;
