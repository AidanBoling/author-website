import { notFound } from 'next/navigation';
import { getById } from '@/main/api/getResourceItems';
import PageWrapper from '@/main/components/layout/PageWrapper';
import ArticlePage from '@/main/components/mainPages/ArticlePage';

export const revalidate = 300;

export default async function Page({ params }) {
    const article = await getById(params.id, 'articles');
    if (!article) {
        notFound();
    }
    return (
        <PageWrapper>
            <ArticlePage article={article} />
        </PageWrapper>
    );
}
