'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DOMPurify from 'dompurify';
import { getById } from '@/main/api/getResourceItems';

function ArticlePage(props) {
    const params = useParams();
    console.log('Id: ', params.id);

    const [article, setArticle] = useState('');

    useEffect(() => {
        async function fetchItem() {
            console.log('Fetching item...');
            const foundItem = await getById(params.id, 'articles');
            // console.log(foundItem);
            setArticle(foundItem);
        }
        fetchItem();
    }, []);

    return (
        <div className="main">
            {article && (
                <div className="article fullpage">
                    {/* {console.log(article)} */}

                    <div className="article-header fullpage header">
                        <h1>{article.title}</h1>
                        <p>
                            Published{' '}
                            {new Date(article.datePublished).toLocaleDateString(
                                'en-us',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                            )}
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
