import PageWrapper from '@/main/components/layout/PageWrapper';
import Contact from '@/main/components/mainPages/Contact';

export default function Page() {
    return (
        <PageWrapper header="Contact" usePaper>
            <Contact />
        </PageWrapper>
    );
}
