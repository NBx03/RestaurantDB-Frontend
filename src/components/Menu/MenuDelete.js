import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import MenuService from '../../services/MenuService';

const MenuDelete = () => {
    const { id } = useParams();
    const [menu, setMenu] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        MenuService.getMenu(id).then(response => {
            setMenu(response.data);
        });
    }, [id]);

    const handleDelete = () => {
        MenuService.deleteMenu(id).then(() => {
            navigate('/menus');
        });
    };

    if (!menu) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Delete Menu</Typography>
            <Typography variant="h6">Are you sure you want to delete this menu?</Typography>
            <Typography variant="h6">Name: {menu.name}</Typography>
            <Typography variant="h6">Description: {menu.description}</Typography>
            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
            <Button variant="contained" onClick={() => navigate('/menus')}>Cancel</Button>
        </Container>
    );
};

export default MenuDelete;
