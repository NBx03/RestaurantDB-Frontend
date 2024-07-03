import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import RestaurantOrderService from '../../services/RestaurantOrderService';

const RestaurantOrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        RestaurantOrderService.getOrders().then(response => {
            setOrders(response.data.content);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Restaurant Orders</Typography>
            <Button variant="contained" color="primary" component={Link} to="/orders/new">Add Order</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Total Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                            <TableCell>{order.totalAmount}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>
                                <Button component={Link} to={`/orders/${order.id}`}>View</Button>
                                <Button component={Link} to={`/orders/${order.id}/edit`}>Edit</Button>
                                <Button component={Link} to={`/orders/${order.id}/delete`}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="secondary" component={Link} to="/">Back to Home</Button>
        </Container>
    );
};

export default RestaurantOrderList;
