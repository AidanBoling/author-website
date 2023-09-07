import { Container, Card, CardContent, CardHeader } from '@mui/material';
import { Button } from 'react-admin';

function Dashboard() {
    return (
        <Container>
            <Card>
                <CardHeader title="Welcome to the administration dashboard" />
                <CardContent>
                    <p>Lorem ipsum sic dolor amet...</p>
                    <button>Posts - Drafts</button>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Dashboard;
