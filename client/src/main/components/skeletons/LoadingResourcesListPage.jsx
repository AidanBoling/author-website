'use client';
import PageWrapper from '@/main/components/PageWrapper';
import Stack from '@mui/material/Stack';
import ResourceCardSkeleton from '@/main/components/cards/ResourceCardSkeleton';

function LoadingResourcesListPage(props) {
    return (
        <PageWrapper header={props.header}>
            <Stack spacing={3}>
                <ResourceCardSkeleton hasMedia />
                <ResourceCardSkeleton hasMedia />
            </Stack>
        </PageWrapper>
    );
}

function ResourcesListSkeleton() {
    return (
        <Stack spacing={3}>
            <ResourceCardSkeleton hasMedia />
            <ResourceCardSkeleton hasMedia />
        </Stack>
    );
}

export default LoadingResourcesListPage;
export { ResourcesListSkeleton };
