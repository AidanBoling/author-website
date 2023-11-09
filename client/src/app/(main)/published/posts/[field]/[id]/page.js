import { notFound } from 'next/navigation';
import { getById } from '@/main/api/getResourceItems';
import PageWrapper from '@/main/components/layout/PageWrapper';
import PostPage from '@/main/components/mainPages/PostPage';

export default async function Page({ params }) {
    const post = await getById(params.id, 'posts');
    if (!post) {
        notFound();
    }
    return (
        <PageWrapper>
            <PostPage post={post} />
        </PageWrapper>
    );
}
