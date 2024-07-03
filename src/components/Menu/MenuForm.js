import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import MenuService from '../../services/MenuService';
import DishService from '../../services/DishService';

const MenuForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [dishes, setDishes] = useState([]);
    const [selectedDishes, setSelectedDishes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        DishService.getDishes().then(response => {
            setDishes(response.data.content);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMenu = { name, description, type, dishIds: selectedDishes };
        MenuService.createMenu(newMenu).then(() => {
            navigate('/menus');
        });
    };

    const handleDishChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedDishes(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Add Menu</Typography>
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
                />
                <FormControl fullWidth>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                        labelId="type-label"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value="STANDARD">Standard</MenuItem>
                        <MenuItem value="BREAKFAST">Breakfast</MenuItem>
                        <MenuItem value="LUNCH">Lunch</MenuItem>
                        <MenuItem value="KIDS_MENU">Kids Menu</MenuItem>
                        <MenuItem value="VEGETARIAN_MENU">Vegetarian Menu</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="dishes-label">Dishes</InputLabel>
                    <Select
                        labelId="dishes-label"
                        multiple
                        value={selectedDishes}
                        onChange={handleDishChange}
                        renderValue={(selected) => selected.map(id => dishes.find(dish => dish.id === id).name).join(', ')}
                    >
                        {dishes.map((dish) => (
                            <MenuItem key={dish.id} value={dish.id}>
                                <Checkbox checked={selectedDishes.indexOf(dish.id) > -1} />
                                <ListItemText primary={dish.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Save</Button>
            </form>
        </Container>
    );
};

export default MenuForm;
