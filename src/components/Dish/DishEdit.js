import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, FormControlLabel, Switch, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import DishService from '../../services/DishService';

const DishEdit = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState(true);
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        DishService.getDish(id).then(response => {
            const dish = response.data;
            setName(dish.name);
            setDescription(dish.description);
            setPrice(dish.price);
            setAvailability(dish.availability);
            setCategory(dish.category);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedDish = { name, description, price, availability, category };
        DishService.updateDish(id, updatedDish).then(() => {
            navigate('/dishes');
        });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Edit Dish</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    required
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={availability}
                            onChange={(e) => setAvailability(e.target.checked)}
                        />
                    }
                    label="Available"
                />
                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="APPETIZER">Appetizer</MenuItem>
                        <MenuItem value="MAIN_COURSE">Main Course</MenuItem>
                        <MenuItem value="DESSERT">Dessert</MenuItem>
                        <MenuItem value="SNACK">Snack</MenuItem>
                        <MenuItem value="BEVERAGE">Beverage</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Update</Button>
            </form>
        </Container>
    );
};

export default DishEdit;