'use client';
// import { useParams } from 'next/navigation';
// import { getById } from '@/main/api/getResourceItems';
// import PeriodicalsPageSkeleton from '@/main/components/skeletons/PeriodicalsPageSkeleton.jsx';
import PeriodicalsHeading from '@/main/components/layout/PeriodicalsHeading';
import PeriodicalsBody from '@/main/components/layout/PeriodicalsBody';
import PeriodicalsFooter from '@/main/components/layout/PeriodicalsFooter';

function PostPage({ post }) {
    // const params = useParams();

    // useEffect(() => {
    //     async function fetchItem() {
    //         const foundItem = await getById(params.id, 'posts');
    //         // console.log(foundItem);
    //         setPost(foundItem);
    //         setRichText(foundItem.content.richText);
    //     }
    //     fetchItem();
    // }, []);

    let publishedDate = post.publishedDate
        ? post.publishedDate
        : post.createdAt;

    return (
        post && (
            <>
                <PeriodicalsHeading
                    title={post.title}
                    published={publishedDate}
                />
                <PeriodicalsBody
                    periodical={post}
                    imageFloat="left"
                    content={post.content.richText}
                    contentFallback={
                        post.content.plain &&
                        post.content.plain.length > 0 &&
                        post.content.plain.map((paragraph, index) => (
                            <p key={index + 1}>{paragraph}</p>
                        ))
                    }
                />
                <PeriodicalsFooter />
            </>
        )
    );
}

export default PostPage;
