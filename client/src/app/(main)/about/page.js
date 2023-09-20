'use client';
import PageWrapper from '../components/PageWrapper';
import About from '../components/pages/About';

export default function Page() {
    return <PageWrapper header="About" content={<About />} usePaper />;
}
