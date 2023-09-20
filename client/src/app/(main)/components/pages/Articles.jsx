import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { getList } from '../../../../main/api/getResourceItems';
import ArticleCard from '../cards/ArticleCard';
import ResourceCardSkeleton from '../cards/ResourceCardSkeleton';

function Articles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            const allItems = await getList('articles');
            console.log(allItems);
            setArticles(allItems);
        }
        fetchItems();
    }, []);

    return (
        <Stack spacing={3}>
            {console.log('Articles: ', articles)}
            {articles.length > 0 ? (
                articles.map(article => (
                    <ArticleCard
                        key={article._id}
                        article={article}
                        hasMedia="true"
                    />
                ))
            ) : (
                <ResourceCardSkeleton hasMedia="true" />
            )}
        </Stack>
    );
}

export default Articles;
