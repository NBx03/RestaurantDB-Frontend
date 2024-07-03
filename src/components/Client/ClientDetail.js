import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ClientService from '../../services/ClientService';

const ClientDetail = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);
    const [bills, setBills] = useState([]);

    useEffect(() => {
        ClientService.getClient(id).then(response => {
            setClient(response.data);
        });

        ClientService.getClientBills(id).then(response => {
            setBills(response.data);
        });
    }, [id]);

    if (!client) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Client Detail</Typography>
            <Typography variant="h6">Name: {client.name}</Typography>
            <Typography variant="h6">Surname: {client.surname}</Typography>
            <Typography variant="h6">Phone Number: {client.phoneNumber}</Typography>
            <Typography variant="h6">Dining Table Number: {client.diningTableNumber}</Typography>
            <Typography variant="h5" gutterBottom>Bills</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Total Amount</TableCell>
                        <TableCell>Issued At</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bills.map(bill => (
                        <TableRow key={bill.id}>
                            <TableCell>{bill.id}</TableCell>
                            <TableCell>{bill.totalAmount}</TableCell>
                            <TableCell>{new Date(bill.issuedAt).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="primary" component={Link} to="/clients">Back to List</Button>
        </Container>
    );
};

export default ClientDetail;
