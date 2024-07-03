import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import WaiterService from '../../services/WaiterService';

const WaiterForm = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [managerId, setManagerId] = useState('');
    const [waiters, setWaiters] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        WaiterService.getWaiters().then(response => {
            setWaiters(response.data.content);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newWaiter = { name, surname, managerId: managerId || null };

        const validationErrors = {};
        if (!name) validationErrors.name = "Name is required";
        if (!surname) validationErrors.surname = "Surname is required";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        WaiterService.createWaiter(newWaiter).then(() => {
            navigate('/waiters');
        });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Add Waiter</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    label="Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    fullWidth
                    required
                    error={!!errors.surname}
                    helperText={errors.surname}
                />
                <FormControl fullWidth>
                    <InputLabel id="manager-label">Manager</InputLabel>
                    <Select
                        labelId="manager-label"
                        value={managerId}
                        onChange={(e) => setManagerId(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {waiters.map((waiter) => (
                            <MenuItem key={waiter.id} value={waiter.id}>
                                {waiter.name} {waiter.surname}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Save</Button>
            </form>
        </Container>
    );
};

export default WaiterForm;
