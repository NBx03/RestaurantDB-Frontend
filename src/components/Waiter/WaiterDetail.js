import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import WaiterService from '../../services/WaiterService';

const WaiterDetail = () => {
    const { id } = useParams();
    const [waiter, setWaiter] = useState(null);
    const [subordinates, setSubordinates] = useState([]);

    useEffect(() => {
        WaiterService.getWaiter(id).then(response => {
            const waiterData = response.data;
            setWaiter(waiterData);

            if (waiterData.subordinateIds && waiterData.subordinateIds.length > 0) {
                const subordinatePromises = waiterData.subordinateIds.map(subId => WaiterService.getWaiter(subId));
                Promise.all(subordinatePromises).then(subordinateResponses => {
                    const subordinateData = subordinateResponses.map(res => res.data);
                    setSubordinates(subordinateData);
                });
            }
        });
    }, [id]);

    if (!waiter) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Waiter Detail</Typography>
            <Typography variant="h6">Name: {waiter.name}</Typography>
            <Typography variant="h6">Surname: {waiter.surname}</Typography>
            <Typography variant="h6">Manager: {waiter.managerId ? `${waiter.managerName} ${waiter.managerSurname}` : 'None'}</Typography>
            <Typography variant="h5" gutterBottom>Subordinates</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Surname</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subordinates.map(subordinate => (
                        <TableRow key={subordinate.id}>
                            <TableCell>{subordinate.id}</TableCell>
                            <TableCell>{subordinate.name}</TableCell>
                            <TableCell>{subordinate.surname}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="primary" component={Link} to="/waiters">Back to List</Button>
        </Container>
    );
};

export default WaiterDetail;
