import { Suspense } from 'react';
import { getList } from '@/main/api/getResourceItems';
import ArticleCard from '@/main/components/cards/ArticleCard';
import NoItemsMessage from '@/main/components/NoItemsMessage';
import ResourceCardSkeleton from '@/main/components/cards/ResourceCardSkeleton';

export default async function ArticlesList() {
    const articles = await getList('articles');

    return (
        <Suspense fallback={<ResourceCardSkeleton hasMedia />}>
            {/* {console.log('Articles: ', props.articles)} */}

            {articles.length > 0 ? (
                articles.map(article => (
                    <ArticleCard key={article._id} article={article} hasMedia />
                ))
            ) : (
                <NoItemsMessage message={'No articles found'} />
            )}
        </Suspense>
    );
}
