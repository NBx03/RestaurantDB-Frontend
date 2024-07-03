import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import MenuService from '../../services/MenuService';

const MenuList = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        MenuService.getMenus().then(response => {
            setMenus(response.data.content);
        });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Menus</Typography>
            <Button variant="contained" color="primary" component={Link} to="/menus/new">Add Menu</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {menus.map(menu => (
                        <TableRow key={menu.id}>
                            <TableCell>{menu.name}</TableCell>
                            <TableCell>{menu.description}</TableCell>
                            <TableCell>{menu.type}</TableCell>
                            <TableCell>
                                <Button component={Link} to={`/menus/${menu.id}`}>View</Button>
                                <Button component={Link} to={`/menus/${menu.id}/edit`}>Edit</Button>
                                <Button component={Link} to={`/menus/${menu.id}/delete`}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="secondary" component={Link} to="/">Back to Home</Button>
        </Container>
    );
};

export default MenuList;
