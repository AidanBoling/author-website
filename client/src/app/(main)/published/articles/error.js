'use client';
import ResourceListPageError from '@/main/components/errors/ResourceListPageError';

export default function Error({ error, reset }) {
    return (
        <ResourceListPageError
            resource="Articles"
            error={error}
            reset={reset}
        />
    );
}
