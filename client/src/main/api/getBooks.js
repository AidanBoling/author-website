import { BASE_URL } from './config';

export async function getBooks() {
    return await fetch(`${BASE_URL}/books`).then(response => {
        return response.json();
    });
}
