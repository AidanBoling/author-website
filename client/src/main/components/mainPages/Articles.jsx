'use client';
import { Stack } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import ResourceCardError from '../errors/ResourceCardError';
import ArticleCard from '@/main/components/cards/ArticleCard';
import NoItemsMessage from '@/main/components/NoItemsMessage';

function Articles(props) {
    return (
        <Stack spacing={{ xs: 4, md: 3 }}>
            {/* {console.log('Articles: ', props.articles)} */}
            {props.articles.length > 0 ? (
                props.articles.map(article => (
                    <ErrorBoundary
                        key={article._id}
                        fallback={<ResourceCardError item={article} />}>
                        <ArticleCard article={article} hasMedia />
                    </ErrorBoundary>
                ))
            ) : (
                <NoItemsMessage message={'No articles found'} />
            )}
        </Stack>
    );
}

export default Articles;
