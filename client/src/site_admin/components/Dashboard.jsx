'use client';
import {
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    CardHeader,
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Button } from 'react-admin';

function Dashboard() {
    // const { isLoading, authenticated } = useAuthState();

    return (
        <Container>
            <Card sx={{ mb: '1rem' }}>
                <CardHeader title="Welcome to the administration dashboard" />
                <CardContent>
                    <p>Lorem ipsum sic dolor amet...</p>
                    <Box>
                        <Button
                            to="/posts"
                            variant="outlined"
                            sx={{ p: '.75rem' }}>
                            <EditNoteIcon /> Posts - Drafts
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ minWidth: '200px' }}>
                        <CardHeader title="Posts" />
                        <CardContent>
                            <Button variant="outlined" sx={{ p: '.75rem' }}>
                                <EditNoteIcon mr=".25rem" /> Drafts
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Dashboard;
