import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Welcome to the Restaurant Management System
            </Typography>
            <Grid container spacing={3}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/clients"
                    >
                        Manage Clients
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/dining-tables"
                    >
                        Manage Dining Tables
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/waiters"
                    >
                        Manage Waiters
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/orders"
                    >
                        Manage Orders
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/menus"
                    >
                        Manage Menus
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/bills"
                    >
                        Manage Bills
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/ingredients"
                    >
                        Manage Ingredients
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/suppliers"
                    >
                        Manage Suppliers
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/dishes"
                    >
                        Manage Dishes
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/recipes"
                    >
                        Manage Recipes
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
