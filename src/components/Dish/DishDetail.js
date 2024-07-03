import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DishService from '../../services/DishService';
import RecipeService from '../../services/RecipeService';

const DishDetail = () => {
    const { id } = useParams();
    const [dish, setDish] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        DishService.getDish(id).then(response => {
            setDish(response.data);
        });

        RecipeService.getRecipesByDishId(id).then(response => {
            setRecipes(response.data);
        }).catch(error => {
            console.error('Error fetching recipes:', error);
        });
    }, [id]);

    if (!dish) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Dish Detail</Typography>
            <Typography variant="h6">Name: {dish.name}</Typography>
            <Typography variant="h6">Description: {dish.description}</Typography>
            <Typography variant="h6">Price: {dish.price}</Typography>
            <Typography variant="h6">Availability: {dish.availability ? 'Available' : 'Unavailable'}</Typography>
            <Typography variant="h6">Category: {dish.category}</Typography>
            <Typography variant="h5" gutterBottom>Recipes</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Recipe Name</TableCell>
                        <TableCell>Preparation Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recipes.length > 0 ? (
                        recipes.map(recipe => (
                            <TableRow key={recipe.id}>
                                <TableCell>{recipe.id}</TableCell>
                                <TableCell>{recipe.recipeName}</TableCell>
                                <TableCell>{recipe.preparationTime}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3}>No recipes available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Button variant="contained" color="primary" component={Link} to="/dishes">Back to List</Button>
        </Container>
    );
};

export default DishDetail;
