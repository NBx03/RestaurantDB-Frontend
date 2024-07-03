import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ClientService from '../../services/ClientService';

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        ClientService.getClients().then(response => {
            setClients(response.data.content);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Clients</Typography>
            <Button variant="contained" color="primary" component={Link} to="/clients/new">Add Client</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Surname</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clients.map(client => (
                        <TableRow key={client.id}>
                            <TableCell>{client.name}</TableCell>
                            <TableCell>{client.surname}</TableCell>
                            <TableCell>{client.phoneNumber}</TableCell>
                            <TableCell>
                                <Button component={Link} to={`/clients/${client.id}`}>View</Button>
                                <Button component={Link} to={`/clients/${client.id}/edit`}>Edit</Button>
                                <Button component={Link} to={`/clients/${client.id}/delete`}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="secondary" component={Link} to="/">Back to Home</Button>
        </Container>
    );
};

export default ClientList;
