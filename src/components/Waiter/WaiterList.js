import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import WaiterService from '../../services/WaiterService';

const WaiterList = () => {
    const [waiters, setWaiters] = useState([]);

    useEffect(() => {
        WaiterService.getWaiters().then(response => {
            setWaiters(response.data.content);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Waiters</Typography>
            <Button variant="contained" color="primary" component={Link} to="/waiters/new">Add Waiter</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Surname</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {waiters.map(waiter => (
                        <TableRow key={waiter.id}>
                            <TableCell>{waiter.name}</TableCell>
                            <TableCell>{waiter.surname}</TableCell>
                            <TableCell>
                                <Button component={Link} to={`/waiters/${waiter.id}`}>View</Button>
                                <Button component={Link} to={`/waiters/${waiter.id}/edit`}>Edit</Button>
                                <Button component={Link} to={`/waiters/${waiter.id}/delete`}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="secondary" component={Link} to="/">Back to Home</Button>
        </Container>
    );
};

export default WaiterList;
