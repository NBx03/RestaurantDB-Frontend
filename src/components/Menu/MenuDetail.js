import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import MenuService from '../../services/MenuService';
import DishService from '../../services/DishService';

const MenuDetail = () => {
    const { id } = useParams();
    const [menu, setMenu] = useState(null);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        MenuService.getMenu(id).then(response => {
            setMenu(response.data);

            // Загружаем данные о блюдах
            if (response.data.dishIds && response.data.dishIds.length > 0) {
                const dishRequests = response.data.dishIds.map(dishId => DishService.getDish(dishId));
                Promise.all(dishRequests).then(dishResponses => {
                    const loadedDishes = dishResponses.map(dishResponse => dishResponse.data);
                    setDishes(loadedDishes);
                });
            }
        });
    }, [id]);

    if (!menu) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Menu Detail</Typography>
            <Typography variant="h6">Name: {menu.name}</Typography>
            <Typography variant="h6">Description: {menu.description}</Typography>
            <Typography variant="h6">Type: {menu.type}</Typography>
            <Typography variant="h5" gutterBottom>Dishes</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dishes.length > 0 ? (
                        dishes.map(dish => (
                            <TableRow key={dish.id}>
                                <TableCell>{dish.id}</TableCell>
                                <TableCell>{dish.name}</TableCell>
                                <TableCell>{dish.price}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3}>No dishes available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Button variant="contained" color="primary" component={Link} to="/menus">Back to List</Button>
        </Container>
    );
};

export default MenuDetail;
