import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import BillService from '../../services/BillService';
import ClientService from '../../services/ClientService';

const BillEdit = () => {
    const { id } = useParams();
    const [totalAmount, setTotalAmount] = useState('');
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        ClientService.getClients().then(response => {
            setClients(response.data.content);
        });

        BillService.getBill(id).then(response => {
            const bill = response.data;
            setTotalAmount(bill.totalAmount);
            setSelectedClient(bill.clientId); // Assuming the bill object has a clientId field
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBill = { totalAmount, clientId: selectedClient };
        BillService.updateBill(id, updatedBill).then(() => {
            navigate('/bills');
        });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Edit Bill</Typography>
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
                <Button type="submit" variant="contained" color="primary">Update</Button>
            </form>
        </Container>
    );
};

export default BillEdit;
