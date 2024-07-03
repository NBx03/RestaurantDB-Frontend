import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DishService from '../../services/DishService';

const DishList = () => {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        DishService.getDishes().then(response => {
            setDishes(response.data.content);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Dishes</Typography>
            <Button variant="contained" color="primary" component={Link} to="/dishes/new">Add Dish</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Availability</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dishes.map(dish => (
                        <TableRow key={dish.id}>
                            <TableCell>{dish.name}</TableCell>
                            <TableCell>{dish.description}</TableCell>
                            <TableCell>{dish.price}</TableCell>
                            <TableCell>{dish.availability ? 'Available' : 'Unavailable'}</TableCell>
                            <TableCell>{dish.category}</TableCell>
                            <TableCell>
                                <Button component={Link} to={`/dishes/${dish.id}`}>View</Button>
                                <Button component={Link} to={`/dishes/${dish.id}/edit`}>Edit</Button>
                                <Button component={Link} to={`/dishes/${dish.id}/delete`}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="secondary" component={Link} to="/">Back to Home</Button>
        </Container>
    );
};

export default DishList;
