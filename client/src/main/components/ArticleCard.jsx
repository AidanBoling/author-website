import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ArticleCard(props) {
    console.log('Received article: ', props.article);
    // console.log(props.post._id);

    return (
        <div className="article card resource-card">
            <div className="article-image card image">
                <img
                    src={props.article.image.url}
                    alt={props.article.image.altText}
                />
            </div>
            <div className="card content">
                <div className="article-header">
                    <h2>{props.article.title}</h2>
                    <span>
                        {new Date(
                            props.article.datePublished
                        ).toLocaleDateString()}
                    </span>
                </div>

                <div className="article-content">
                    <p>{props.article.descriptionShort}</p>
                </div>
                {props.article.content ? (
                    <Link
                        to={`/published/articles/id/${props.article._id}`}
                        className="link">
                        ➣ <span>Read full article</span>
                    </Link>
                ) : (
                    <a href={props.article.url} className="link">
                        ➣
                        <span>
                            Read article on {props.article.publisher.name}
                        </span>
                    </a>
                )}
            </div>
        </div>
    );
}

export default ArticleCard;
