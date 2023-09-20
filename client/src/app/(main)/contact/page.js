'use client';
import PageWrapper from '../components/PageWrapper';
import Contact from '../components/pages/Contact';

export default function Page() {
    return <PageWrapper header="Contact" content={<Contact />} usePaper />;
}
