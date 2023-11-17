'use client';
import Link from 'next/link';
import { Button } from '@mui/material';
import ResourceCard from './ResourceCard';

function PostCard(props) {
    // const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    // console.log('Received post: ', props.post);

    let summary = '';
    if (props.post.content && props.post.content.teaser) {
        summary = props.post.content.teaser.substring(0, 300) + '...';
    } else if (
        props.post.content &&
        props.post.content.plain &&
        props.post.content.plain.length > 0
    ) {
        summary = props.post.content.plain[0].substring(0, 300) + '...';
    }

    const image =
        props.post.image &&
        (props.post.image.fromDB ? props.post.image.fromDB : props.post.image);

    return (
        <ResourceCard
            resource="post"
            title={props.post.title}
            image={image && image.url ? image.url : null}
            //     props.post.image && props.post.image.url
            //         ? props.post.image.url
            //         : null
            // }
            imageAlt={image && image.altText ? image.altText : null}
            //     props.post.image && props.post.image.altText
            //         ? props.post.image.altText
            //         : null
            // }
            published={props.post.datePublished}
            created={props.post.createdAt}
            content={summary}
            mainLinkIsLocal={true}
            mainLinkTo={`/published/posts/id/${props.post._id}`}
            mainLinkLabel="Read full post"
            actions={
                <Button
                    component={Link}
                    href={`/published/posts/id/${props.post._id}`}
                    className="link">
                    ➣ Read full post
                </Button>
            }
        />
    );
}

export default PostCard;
