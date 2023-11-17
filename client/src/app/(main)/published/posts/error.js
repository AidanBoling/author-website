'use client';
import ResourceListPageError from '@/main/components/errors/ResourceListPageError';

export default function Error({ error, reset }) {
    return (
        <ResourceListPageError resource="Posts" error={error} reset={reset} />
    );
}
