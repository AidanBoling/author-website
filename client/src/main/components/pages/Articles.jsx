import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { getList } from '../../api/getResourceItems';
import PageTitle from '../PageTitle';
import ArticleCard from '../ArticleCard';
import ResourceCardSkeleton from '../ResourceCardSkeleton';

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
