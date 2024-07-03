import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import BillService from '../../services/BillService';

const BillList = () => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        BillService.getBills().then(response => {
            setBills(response.data.content);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Bills</Typography>
            <Button variant="contained" color="primary" component={Link} to="/bills/new">Add Bill</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Total Amount</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bills.map(bill => (
                        <TableRow key={bill.id}>
                            <TableCell>{bill.id}</TableCell>
                            <TableCell>{bill.totalAmount}</TableCell>
                            <TableCell>
                                <Button component={Link} to={`/bills/${bill.id}`}>View</Button>
                                <Button component={Link} to={`/bills/${bill.id}/edit`}>Edit</Button>
                                <Button component={Link} to={`/bills/${bill.id}/delete`}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="secondary" component={Link} to="/">Back to Home</Button>
        </Container>
    );
};

export default BillList;
