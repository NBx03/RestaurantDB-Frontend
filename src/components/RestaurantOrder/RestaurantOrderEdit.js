import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, FormHelperText, Checkbox, ListItemText } from '@mui/material';
import RestaurantOrderService from '../../services/RestaurantOrderService';
import ClientService from '../../services/ClientService';
import WaiterService from '../../services/WaiterService';
import DishService from '../../services/DishService';

const RestaurantOrderEdit = () => {
    const { id } = useParams();
    const [totalAmount, setTotalAmount] = useState('');
    const [status, setStatus] = useState('');
    const [clientId, setClientId] = useState('');
    const [waiterId, setWaiterId] = useState('');
    const [dishSelections, setDishSelections] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [clients, setClients] = useState([]);
    const [waiters, setWaiters] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        DishService.getDishes().then(response => {
            setDishes(response.data.content);
        });
        ClientService.getClients().then(response => {
            setClients(response.data.content);
        });
        WaiterService.getWaiters().then(response => {
            setWaiters(response.data.content);
        });

        RestaurantOrderService.getOrder(id).then(response => {
            const order = response.data;
            setTotalAmount(order.totalAmount);
            setStatus(order.status);
            setClientId(order.clientId);
            setWaiterId(order.waiterId);
            const dishSelections = order.dishIds.map((dishId, index) => ({
                dishId,
                quantity: order.dishQuantities[index]
            }));
            setDishSelections(dishSelections);
        });
    }, [id]);

    const handleDishSelection = (dishId) => {
        const selectedDish = dishSelections.find(dish => dish.dishId === dishId);
        if (selectedDish) {
            setDishSelections(dishSelections.filter(dish => dish.dishId !== dishId));
        } else {
            setDishSelections([...dishSelections, { dishId, quantity: 1 }]);
        }
    };

    const handleDishQuantityChange = (dishId, quantity) => {
        setDishSelections(dishSelections.map(dish => dish.dishId === dishId ? { ...dish, quantity: parseInt(quantity, 10) } : dish));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedOrder = {
            totalAmount,
            status,
            clientId,
            waiterId,
            dishIds: dishSelections.map(dish => dish.dishId),
            dishQuantities: dishSelections.map(dish => dish.quantity)
        };

        const validationErrors = {};
        if (!status) validationErrors.status = "Status is required";
        if (!clientId) validationErrors.clientId = "Client is required";
        if (!waiterId) validationErrors.waiterId = "Waiter is required";
        if (dishSelections.length === 0) validationErrors.dishIds = "At least one dish is required";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        RestaurantOrderService.updateOrder(id, updatedOrder).then(() => {
            navigate('/orders');
        });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Edit Restaurant Order</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Total Amount"
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    fullWidth
                    required
                    error={!!errors.totalAmount}
                    helperText={errors.totalAmount}
                />
                <FormControl fullWidth error={!!errors.status}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <MenuItem value="PENDING">Pending</MenuItem>
                        <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                        <MenuItem value="COMPLETED">Completed</MenuItem>
                        <MenuItem value="CANCELLED">Cancelled</MenuItem>
                    </Select>
                    <FormHelperText>{errors.status}</FormHelperText>
                </FormControl>
                <FormControl fullWidth error={!!errors.clientId}>
                    <InputLabel id="client-label">Client</InputLabel>
                    <Select
                        labelId="client-label"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                    >
                        {clients.map((client) => (
                            <MenuItem key={client.id} value={client.id}>
                                {client.name} {client.surname}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.clientId}</FormHelperText>
                </FormControl>
                <FormControl fullWidth error={!!errors.waiterId}>
                    <InputLabel id="waiter-label">Waiter</InputLabel>
                    <Select
                        labelId="waiter-label"
                        value={waiterId}
                        onChange={(e) => setWaiterId(e.target.value)}
                    >
                        {waiters.map((waiter) => (
                            <MenuItem key={waiter.id} value={waiter.id}>
                                {waiter.name} {waiter.surname}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.waiterId}</FormHelperText>
                </FormControl>
                <FormControl fullWidth error={!!errors.dishIds}>
                    <InputLabel id="dishes-label">Dishes</InputLabel>
                    <Select
                        labelId="dishes-label"
                        multiple
                        value={dishSelections.map(dish => dish.dishId)}
                        renderValue={(selected) => selected.map(dishId => dishes.find(d => d.id === dishId).name).join(', ')}
                    >
                        {dishes.map((dish) => (
                            <MenuItem key={dish.id} value={dish.id}>
                                <Checkbox
                                    checked={dishSelections.some(selectedDish => selectedDish.dishId === dish.id)}
                                    onChange={() => handleDishSelection(dish.id)}
                                />
                                <ListItemText primary={dish.name} />
                                {dishSelections.some(selectedDish => selectedDish.dishId === dish.id) && (
                                    <TextField
                                        label="Quantity"
                                        type="number"
                                        value={dishSelections.find(selectedDish => selectedDish.dishId === dish.id).quantity}
                                        onChange={(e) => handleDishQuantityChange(dish.id, e.target.value)}
                                        inputProps={{ min: 1 }}
                                        style={{ marginLeft: '1em', width: '5em' }}
                                    />
                                )}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.dishIds}</FormHelperText>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Update</Button>
            </form>
        </Container>
    );
};

export default RestaurantOrderEdit;
