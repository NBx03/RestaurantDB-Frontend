import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import ClientService from '../../services/ClientService';
import DiningTableService from '../../services/DiningTableService';

const ClientForm = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [diningTables, setDiningTables] = useState([]);
    const [selectedDiningTable, setSelectedDiningTable] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        DiningTableService.getDiningTables().then(response => {
            setDiningTables(response.data.content);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newClient = { name, surname, phoneNumber, diningTableNumber: selectedDiningTable };
        ClientService.createClient(newClient).then(() => {
            navigate('/clients');
        });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Add Client</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    fullWidth
                    required
                />
                <FormControl fullWidth>
                    <InputLabel id="dining-table-label">Dining Table</InputLabel>
                    <Select
                        labelId="dining-table-label"
                        value={selectedDiningTable}
                        onChange={(e) => setSelectedDiningTable(e.target.value)}
                    >
                        {diningTables.map(diningTable => (
                            <MenuItem key={diningTable.id} value={diningTable.number}>
                                {diningTable.number}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Save</Button>
            </form>
        </Container>
    );
};

export default ClientForm;
