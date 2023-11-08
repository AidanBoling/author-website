import ResourceGalleryCard from '../cards/ResourceGalleryCard';
import { getListCache } from '@/main/api/getResourceItems';

export default async function ArticlesCards(props) {
    const articles = await getListCache('articles', props.listParams);
    console.log('Articles found: ', articles);

    return articles.items.length > 0 ? (
        articles.items.map(article => (
            <ResourceGalleryCard
                key={article._id}
                resource="article"
                title={article.title}
                image={article.image.url}
                imageAlt={article.image.altText}
                published={article.datePublished}
                publisher={article.publisher.name}
                // created={props.article.createdAt}
                mainLinkTo={
                    article.url
                        ? article.url
                        : `/published/articles/id/${article._id}`
                }
                mainLinkIsLocal={article.url ? false : true}
                mainLinkLabel={
                    article.url &&
                    `Read this article on the ${article.publisher.name} website, which opens in a new tab.`
                }
                // actions={''}
            />
        ))
    ) : (
        <p>No articles found.</p>
    );
}
