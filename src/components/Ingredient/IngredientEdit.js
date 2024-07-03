import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import IngredientService from '../../services/IngredientService';
import SupplierService from '../../services/SupplierService';

const IngredientEdit = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        IngredientService.getIngredient(id).then(response => {
            const ingredient = response.data;
            setName(ingredient.name);
            setDescription(ingredient.description);
            setStockQuantity(ingredient.stockQuantity);
            setSupplierId(ingredient.supplierId || '');
        });

        SupplierService.getSuppliers().then(response => {
            setSuppliers(response.data.content);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedIngredient = { name, description, stockQuantity, supplierId: supplierId || null };

        const validationErrors = {};
        if (!name) validationErrors.name = "Name is required";
        if (!stockQuantity) validationErrors.stockQuantity = "Stock quantity is required";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        IngredientService.updateIngredient(id, updatedIngredient).then(() => {
            navigate('/ingredients');
        });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Edit Ingredient</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Stock Quantity"
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    fullWidth
                    required
                    error={!!errors.stockQuantity}
                    helperText={errors.stockQuantity}
                />
                <FormControl fullWidth>
                    <InputLabel id="supplier-label">Supplier</InputLabel>
                    <Select
                        labelId="supplier-label"
                        value={supplierId}
                        onChange={(e) => setSupplierId(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {suppliers.map((supplier) => (
                            <MenuItem key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">Update</Button>
            </form>
        </Container>
    );
};

export default IngredientEdit;
