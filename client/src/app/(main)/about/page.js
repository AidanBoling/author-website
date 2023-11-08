import PageWrapper from '@/main/components/layout/PageWrapper';
import About from '@/main/components/mainPages/About';

export default function Page() {
    return (
        <PageWrapper header="About" usePaper>
            <About />
        </PageWrapper>
    );
}
