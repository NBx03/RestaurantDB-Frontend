import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DiningTableService from '../../services/DiningTableService';

const DiningTableList = () => {
    const [diningTables, setDiningTables] = useState([]);

    useEffect(() => {
        DiningTableService.getDiningTables().then(response => {
            setDiningTables(response.data.content);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Dining Tables</Typography>
            <Button variant="contained" color="primary" component={Link} to="/dining-tables/new">Add Dining Table</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Number</TableCell>
                        <TableCell>Capacity</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {diningTables.map(diningTable => (
                        <TableRow key={diningTable.id}>
                            <TableCell>{diningTable.number}</TableCell>
                            <TableCell>{diningTable.capacity}</TableCell>
                            <TableCell>{diningTable.clientName} {diningTable.clientSurname}</TableCell>
                            <TableCell>
                                <Button component={Link} to={`/dining-tables/${diningTable.id}`}>View</Button>
                                <Button component={Link} to={`/dining-tables/${diningTable.id}/edit`}>Edit</Button>
                                <Button component={Link} to={`/dining-tables/${diningTable.id}/delete`}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="secondary" component={Link} to="/">Back to Home</Button>
        </Container>
    );
};

export default DiningTableList;
