import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import RestaurantOrderService from '../../services/RestaurantOrderService';
import ClientService from '../../services/ClientService';
import WaiterService from '../../services/WaiterService';
import DishService from '../../services/DishService';

const RestaurantOrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [client, setClient] = useState(null);
    const [waiter, setWaiter] = useState(null);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        RestaurantOrderService.getOrder(id).then(response => {
            setOrder(response.data);

            if (response.data.clientId) {
                ClientService.getClient(response.data.clientId).then(clientResponse => {
                    setClient(clientResponse.data);
                });
            }

            if (response.data.waiterId) {
                WaiterService.getWaiter(response.data.waiterId).then(waiterResponse => {
                    setWaiter(waiterResponse.data);
                });
            }

            if (response.data.dishIds && response.data.dishIds.length > 0) {
                const dishPromises = response.data.dishIds.map(dishId => DishService.getDish(dishId));
                Promise.all(dishPromises).then(dishResponses => {
                    setDishes(dishResponses.map(dishResponse => dishResponse.data));
                });
            }
        });
    }, [id]);

    if (!order) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Order Detail</Typography>
            <Typography variant="h6">Order Date: {new Date(order.orderDate).toLocaleString()}</Typography>
            <Typography variant="h6">Total Amount: {order.totalAmount}</Typography>
            <Typography variant="h6">Status: {order.status}</Typography>
            <Typography variant="h6">Client: {client ? `${client.name} ${client.surname}` : 'Loading...'}</Typography>
            <Typography variant="h6">Waiter: {waiter ? `${waiter.name} ${waiter.surname}` : 'Loading...'}</Typography>
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
                    {dishes.map(dish => (
                        <TableRow key={dish.id}>
                            <TableCell>{dish.id}</TableCell>
                            <TableCell>{dish.name}</TableCell>
                            <TableCell>{dish.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="primary" component={Link} to="/orders">Back to List</Button>
        </Container>
    );
};

export default RestaurantOrderDetail;
