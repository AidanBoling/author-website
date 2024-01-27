'use client';
import ResourceListPageError from '@/main/components/errors/ResourceListPageError';

export default function Error({ error, reset }) {
    return (
        <ResourceListPageError
            resource="Speaking & Consultations"
            error={error}
            reset={reset}
        />
    );
}
