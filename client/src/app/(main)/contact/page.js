import { Suspense } from 'react';
import PageWrapper from '@/main/components/layout/PageWrapper';
import Contact from '@/main/components/mainPages/Contact';
import ContactForm from '@/main/components/forms/ContactForm';
import ContactFormSkeleton from '@/main/components/skeletons/ContactFormSkeleton';

export default function Page() {
    return (
        <PageWrapper header="Contact">
            <Contact>
                <Suspense fallback={<ContactFormSkeleton />}>
                    <ContactForm />
                </Suspense>
            </Contact>
        </PageWrapper>
    );
}
