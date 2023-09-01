import { BASE_URL } from '../api/config';

export async function getPostById(id) {
    return await fetch(`${BASE_URL}/posts/id/${id}`).then(response => {
        return response.json();
    });
}
