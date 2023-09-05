import { BASE_URL } from './config';

export async function getBookById(id) {
    return await fetch(`${BASE_URL}/books/id/${id}`).then(response => {
        return response.json();
    });
}
