import { BASE_URL } from './config';

export async function getPosts() {
    return await fetch(`${BASE_URL}/posts`).then(response => {
        return response.json();
    });
}
