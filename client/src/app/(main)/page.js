import Home from '@/main/components/mainPages/Home';
import { getList } from '@/main/api/getResourceItems';

function sortResourceByDate(resource, returnMaxResults) {
    const sortedResourceList = resource
        .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished))
        .slice(0, returnMaxResults);
    return sortedResourceList;
}

async function getAndSortResource(resourceName, number) {
    const resourceList = await getList(resourceName);
    if (resourceList) {
        const sortedResource = sortResourceByDate(resourceList, number);
        return sortedResource;
    }
}

export default async function Page() {
    const articles = await getAndSortResource('articles', 4);
    const posts = await getAndSortResource('posts', 4);

    return <Home articles={articles} posts={posts} />;
}
