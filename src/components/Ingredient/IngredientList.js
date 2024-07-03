import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import IngredientService from '../../services/IngredientService';

const IngredientList = () => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        IngredientService.getIngredients().then(response => {
            setIngredients(response.data.content);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Ingredients</Typography>
            <Button variant="contained" color="primary" component={Link} to="/ingredients/new">Add Ingredient</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Stock Quantity</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ingredients.map(ingredient => (
                        <TableRow key={ingredient.id}>
                            <TableCell>{ingredient.name}</TableCell>
                            <TableCell>{ingredient.description}</TableCell>
                            <TableCell>{ingredient.stockQuantity}</TableCell>
                            <TableCell>
                                <Button component={Link} to={`/ingredients/${ingredient.id}`}>View</Button>
                                <Button component={Link} to={`/ingredients/${ingredient.id}/edit`}>Edit</Button>
                                <Button component={Link} to={`/ingredients/${ingredient.id}/delete`}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="secondary" component={Link} to="/">Back to Home</Button>
        </Container>
    );
};

export default IngredientList;
