'use client';
import GeneralPageError from '@/main/components/errors/GeneralPageError';

export default function Error({ error, reset }) {
    return <GeneralPageError pageTitle="About" error={error} reset={reset} />;
}
