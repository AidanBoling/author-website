'use client';
import Books from '@/main/components/mainPages/Books';
import PageWrapper from '@/main/components/PageWrapper';

export default function Page() {
    return <PageWrapper header="Books" content={<Books />} usePaper />;
}
