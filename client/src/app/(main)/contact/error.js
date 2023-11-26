'use client';
import GeneralPageError from '@/main/components/errors/GeneralPageError';

export default function Error({ error, reset }) {
    return <GeneralPageError pageTitle="Contact" error={error} reset={reset} />;
}
