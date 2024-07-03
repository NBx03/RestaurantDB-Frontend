import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import BillService from '../../services/BillService';
import ClientService from '../../services/ClientService';

const BillForm = () => {
    const [totalAmount, setTotalAmount] = useState('');
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        ClientService.getClients().then(response => {
            setClients(response.data.content);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBill = { totalAmount, clientId: selectedClient };
        BillService.createBill(newBill).then(() => {
            navigate('/bills');
        });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Add Bill</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Total Amount"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    fullWidth
                    required
                />
                <FormControl fullWidth required>
                    <InputLabel id="client-label">Client</InputLabel>
                    <Select
                        labelId="client-label"
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                    >
                        {clients.map(client => (
                            <MenuItem key={client.id} value={client.id}>
                                {client.name} {client.surname}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Save</Button>
            </form>
        </Container>
    );
};

export default BillForm;
