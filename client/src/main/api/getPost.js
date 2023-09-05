import { BASE_URL } from './config';

export async function getPostById(id) {
    return await fetch(`${BASE_URL}/posts/id/${id}`).then(response => {
        return response.json();
    });
}
