import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import RecipeService from '../../services/RecipeService';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        RecipeService.getRecipes().then(response => {
            setRecipes(response.data.content);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Recipes</Typography>
            <Button variant="contained" color="primary" component={Link} to="/recipes/new">Add Recipe</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Preparation Time (in minutes)</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recipes.map(recipe => (
                        <TableRow key={recipe.id}>
                            <TableCell>{recipe.recipeName}</TableCell>
                            <TableCell>{recipe.preparationTime}</TableCell>
                            <TableCell>
                                <Button component={Link} to={`/recipes/${recipe.id}`}>View</Button>
                                <Button component={Link} to={`/recipes/${recipe.id}/edit`}>Edit</Button>
                                <Button component={Link} to={`/recipes/${recipe.id}/delete`}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="secondary" component={Link} to="/">Back to Home</Button>
        </Container>
    );
};

export default RecipeList;
