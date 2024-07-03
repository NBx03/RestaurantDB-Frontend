import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import ClientService from '../../services/ClientService';

const ClientDelete = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ClientService.getClient(id).then(response => {
            setClient(response.data);
        });
    }, [id]);

    const handleDelete = () => {
        ClientService.deleteClient(id).then(() => {
            navigate('/clients');
        });
    };

    if (!client) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Delete Client</Typography>
            <Typography variant="h6">Are you sure you want to delete this client?</Typography>
            <Typography variant="h6">Name: {client.name}</Typography>
            <Typography variant="h6">Surname: {client.surname}</Typography>
            <Typography variant="h6">Phone Number: {client.phoneNumber}</Typography>
            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
            <Button variant="contained" onClick={() => navigate('/clients')}>Cancel</Button>
        </Container>
    );
};

export default ClientDelete;
