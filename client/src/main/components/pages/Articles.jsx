import { useState, useEffect } from 'react';
import { getList } from '../../api/getResourceItems';
import PageTitle from '../PageTitle';
import ArticleCard from '../ArticleCard';

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
        <div className="main">
            <PageTitle title="Articles" />
            {console.log('Articles: ', articles)}
            <div className="content">
                {articles.length > 0 &&
                    articles.map(article => (
                        <ArticleCard key={article._id} article={article} />
                    ))}
            </div>
        </div>
    );
}

export default Articles;
