'use client';
import { Stack } from '@mui/material';
// import { Suspense } from 'react';
// import { getList } from '@/main/api/getResourceItems';
import ArticleCard from '@/main/components/cards/ArticleCard';
import NoItemsMessage from '@/main/components/NoItemsMessage';
// import ResourceCardSkeleton from '@/main/components/cards/ResourceCardSkeleton';

function Articles(props) {
    // const { items, ...pageData } = props.pageData;
    // console.log(pageData);
    return (
        <Stack spacing={3}>
            {/* {console.log('Articles: ', props.articles)} */}

            {props.articles.length > 0 ? (
                props.articles.map(article => (
                    <ArticleCard key={article._id} article={article} hasMedia />
                ))
            ) : (
                <NoItemsMessage message={'No articles found'} />
            )}
        </Stack>
    );
}

export default Articles;
