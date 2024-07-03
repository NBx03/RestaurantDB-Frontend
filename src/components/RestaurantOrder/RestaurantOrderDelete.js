import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import RestaurantOrderService from '../../services/RestaurantOrderService';

const RestaurantOrderDelete = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        RestaurantOrderService.getOrder(id).then(response => {
            setOrder(response.data);
        });
    }, [id]);

    const handleDelete = () => {
        RestaurantOrderService.deleteOrder(id).then(() => {
            navigate('/orders');
        });
    };

    if (!order) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Delete Restaurant Order</Typography>
            <Typography variant="h6">Are you sure you want to delete this order?</Typography>
            <Typography variant="h6">Order Date: {new Date(order.orderDate).toLocaleString()}</Typography>
            <Typography variant="h6">Total Amount: {order.totalAmount}</Typography>
            <Typography variant="h6">Status: {order.status}</Typography>
            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
            <Button variant="contained" onClick={() => navigate('/orders')}>Cancel</Button>
        </Container>
    );
};

export default RestaurantOrderDelete;
