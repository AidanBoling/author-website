import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { getById } from '../../api/getResourceItems';
import PageTitle from '../PageTitle';

function ArticlePage() {
    const { articleId } = useParams();
    console.log(articleId);
    const [article, setArticle] = useState('');

    useEffect(() => {
        async function fetchItem() {
            console.log('Fetching item...');
            const foundItem = await getById(articleId, 'articles');
            console.log(foundItem);
            setArticle(foundItem);
        }
        fetchItem();
    }, []);

    return (
        <div className="main">
            {article && (
                <div className="article fullpage">
                    {console.log(article)}

                    <div className="article-header fullpage header">
                        <h1>{article.title}</h1>
                        <p>
                            Published:{' '}
                            {new Date(
                                article.datePublished
                            ).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="article-cover fullpage image">
                        <img
                            src={article.image.url}
                            alt={article.image.altText}></img>
                    </div>
                    <div className="book-content">
                        {article.content ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(article.content),
                                }}
                            />
                        ) : (
                            article.descriptionShort
                        )}
                    </div>
                    {article.publisher.name > 0 && (
                        <div className="article details">
                            {/* TODO: - Make sure links open in new tab */}
                            <p>
                                Publisher:
                                <a href={article.publisher.website}>
                                    {article.publisher.name}
                                </a>
                            </p>
                            <p>
                                <a href={article.url}>
                                    See article in external site
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ArticlePage;
