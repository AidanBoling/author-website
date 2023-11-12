import ResourceGalleryCard from '../cards/ResourceGalleryCard';
import { getList } from '@/main/api/getResourceItems';

export default async function PostsCards(props) {
    const posts = await getList('posts', props.listParams);
    // console.log('Posts found: ', posts);

    return posts.items.length > 0 ? (
        posts.items.map(post => (
            <ResourceGalleryCard
                key={post._id}
                resource="post"
                title={post.title}
                image={post.image && post.image.url ? post.image.url : null}
                imageAlt={
                    post.image && post.image.altText ? post.image.altText : null
                }
                published={post.datePublished}
                created={post.createdAt}
                mainLinkIsLocal={true}
                mainLinkTo={`/published/posts/id/${post._id}`}
                mainLinkLabel="Read full post"
                // actions={
                //     <Button
                //         component={Link}
                //         href={`/published/posts/id/${props.post._id}`}
                //         className="link">
                //         ➣ Read full post
                //     </Button>}
            />
        ))
    ) : (
        <p>No posts found.</p>
    );
}
