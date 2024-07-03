import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import SupplierService from '../../services/SupplierService';

const SupplierDetail = () => {
    const { id } = useParams();
    const [supplier, setSupplier] = useState(null);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        SupplierService.getSupplier(id).then(response => {
            setSupplier(response.data);
            setIngredients(response.data.ingredientIds || []);
        });
    }, [id]);

    if (!supplier) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Supplier Detail</Typography>
            <Typography variant="h6">Name: {supplier.name}</Typography>
            <Typography variant="h5" gutterBottom>Ingredients</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ingredients.map(ingredient => (
                        <TableRow key={ingredient}>
                            <TableCell>{ingredient}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="primary" component={Link} to="/suppliers">Back to List</Button>
        </Container>
    );
};

export default SupplierDetail;
