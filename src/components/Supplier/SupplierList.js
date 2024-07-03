import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import SupplierService from '../../services/SupplierService';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        SupplierService.getSuppliers().then(response => {
            setSuppliers(response.data.content);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Suppliers</Typography>
            <Button variant="contained" color="primary" component={Link} to="/suppliers/new">Add Supplier</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {suppliers.map(supplier => (
                        <TableRow key={supplier.id}>
                            <TableCell>{supplier.name}</TableCell>
                            <TableCell>
                                <Button component={Link} to={`/suppliers/${supplier.id}`}>View</Button>
                                <Button component={Link} to={`/suppliers/${supplier.id}/edit`}>Edit</Button>
                                <Button component={Link} to={`/suppliers/${supplier.id}/delete`}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="secondary" component={Link} to="/">Back to Home</Button>
        </Container>
    );
};

export default SupplierList;
