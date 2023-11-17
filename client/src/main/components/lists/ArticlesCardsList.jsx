import ResourceGalleryCard from '../cards/ResourceGalleryCard';
import { getList } from '@/main/api/getResourceItems';

export default async function ArticlesCards(props) {
    const articles = await getList('articles', props.listParams);
    // console.log('Articles found: ', articles);

    return articles && articles.items.length > 0 ? (
        articles.items.map(article => (
            <ResourceGalleryCard
                key={article._id}
                resource="article"
                title={article.title}
                image={
                    article.image
                        ? article.image.fromDB
                            ? article.image.fromDB.url
                            : article.image.url
                        : null
                }
                imageAlt={
                    article.image
                        ? article.image.fromDB
                            ? article.image.fromDB.altText
                            : article.image.altText
                        : null
                }
                published={article.datePublished}
                publisher={article.publisher && article.publisher.name}
                // created={props.article.createdAt}
                mainLinkTo={
                    article.url
                        ? article.url
                        : `/published/articles/id/${article._id}`
                }
                mainLinkIsLocal={article.url ? false : true}
                mainLinkLabel={
                    article.url &&
                    `Read this article on the ${
                        article.publisher && article.publisher.name
                    } website, which opens in a new tab.`
                }
                // actions={''}
            />
        ))
    ) : (
        <p>No articles found.</p>
    );
}
