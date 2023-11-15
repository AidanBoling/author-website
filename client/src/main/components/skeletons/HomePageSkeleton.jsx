import { Typography } from '@mui/material';
import PageWrapper from '../layout/PageWrapper';

export default function HomePageSkeleton() {
    return (
        <PageWrapper>
            <Typography variant="h5" component="p">
                Loading...
            </Typography>
        </PageWrapper>
    );
}
