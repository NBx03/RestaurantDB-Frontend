import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import DiningTableService from '../../services/DiningTableService';

const DiningTableDetail = () => {
    const { id } = useParams();
    const [diningTable, setDiningTable] = useState(null);

    useEffect(() => {
        DiningTableService.getDiningTable(id).then(response => {
            setDiningTable(response.data);
        });
    }, [id]);

    if (!diningTable) return <div>Loading...</div>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Dining Table Detail</Typography>
            <Typography variant="h6">Number: {diningTable.number}</Typography>
            <Typography variant="h6">Capacity: {diningTable.capacity}</Typography>
            <Typography variant="h6">Client: {diningTable.clientName} {diningTable.clientSurname}</Typography>
            <Button variant="contained" color="primary" component={Link} to="/dining-tables">Back to List</Button>
        </Container>
    );
};

export default DiningTableDetail;
