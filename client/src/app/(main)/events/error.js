'use client';
import ResourceListPageError from '@/main/components/errors/ResourceListPageError';

export default function Error({ error, reset }) {
    return (
        <ResourceListPageError resource="Events" error={error} reset={reset} />
    );
}
