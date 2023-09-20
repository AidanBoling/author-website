'use client';
import Books from '../../components/pages/Books';
import PageWrapper from '../../components/PageWrapper';

export default function Page() {
    return <PageWrapper header="Books" content={<Books />} usePaper />;
}
