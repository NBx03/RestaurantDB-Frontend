import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import RecipeService from '../../services/RecipeService';
import DishService from '../../services/DishService';

const RecipeForm = () => {
    const [recipeName, setRecipeName] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [instructions, setInstructions] = useState({});
    const [dishId, setDishId] = useState('');
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        DishService.getDishes().then(response => {
            setDishes(response.data.content);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!dishId) {
            setError(true);
            return;
        }
        const newRecipe = { recipeName, preparationTime, instructions, dishId };
        RecipeService.createRecipe(newRecipe).then(() => {
            navigate('/recipes');
        });
    };

    const handleInstructionsChange = (e) => {
        const { name, value } = e.target;
        setInstructions({ ...instructions, [name]: value });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Add Recipe</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Recipe Name"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Preparation Time"
                    type="number"
                    value={preparationTime}
                    onChange={(e) => setPreparationTime(e.target.value)}
                    fullWidth
                    required
                />
                <Typography variant="h6" gutterBottom>Instructions</Typography>
                {[...Array(5)].map((_, index) => (
                    <TextField
                        key={index}
                        label={`Step ${index + 1}`}
                        name={`step${index + 1}`}
                        value={instructions[`step${index + 1}`] || ''}
                        onChange={handleInstructionsChange}
                        fullWidth
                        margin="normal"
                    />
                ))}
                <FormControl fullWidth error={error}>
                    <InputLabel id="dish-label">Dish</InputLabel>
                    <Select
                        labelId="dish-label"
                        value={dishId}
                        onChange={(e) => {
                            setDishId(e.target.value);
                            setError(false);
                        }}
                        required
                    >
                        {dishes.map((dish) => (
                            <MenuItem key={dish.id} value={dish.id}>
                                {dish.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && <FormHelperText>Dish is required</FormHelperText>}
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Save</Button>
            </form>
        </Container>
    );
};

export default RecipeForm;
