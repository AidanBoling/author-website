'use client';
import ResourceItemPageError from '@/main/components/errors/ResourceItemPageError';

export default function Error({ error, reset }) {
    return <ResourceItemPageError error={error} reset={reset} />;
}
