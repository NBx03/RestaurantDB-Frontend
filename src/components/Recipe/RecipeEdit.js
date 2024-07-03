import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import RecipeService from '../../services/RecipeService';
import DishService from '../../services/DishService';

const RecipeEdit = () => {
    const { id } = useParams();
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

        RecipeService.getRecipe(id).then(response => {
            const recipe = response.data;
            setRecipeName(recipe.recipeName);
            setPreparationTime(recipe.preparationTime);
            setInstructions(recipe.instructions);
            setDishId(recipe.dishId);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!dishId) {
            setError(true);
            return;
        }
        const updatedRecipe = { recipeName, preparationTime, instructions, dishId };
        RecipeService.updateRecipe(id, updatedRecipe).then(() => {
            navigate('/recipes');
        });
    };

    const handleInstructionsChange = (e) => {
        const { name, value } = e.target;
        setInstructions({ ...instructions, [name]: value });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Edit Recipe</Typography>
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
                {Object.entries(instructions).map(([step, instruction], index) => (
                    <TextField
                        key={index}
                        label={`Step ${index + 1}`}
                        name={`step${index + 1}`}
                        value={instruction}
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
                <Button type="submit" variant="contained" color="primary">Update</Button>
            </form>
        </Container>
    );
};

export default RecipeEdit;
