import PageWrapper from '@/main/components/PageWrapper';
import Contact from '@/main/components/mainPages/Contact';

export default function Page() {
    return <PageWrapper header="Contact" content={<Contact />} usePaper />;
}
