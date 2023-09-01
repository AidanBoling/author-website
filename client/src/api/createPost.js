import { BASE_URL } from '../api/config';

export async function createPost(formData) {
    return await fetch(`${BASE_URL}/compose`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    }).then(response => {
        return response.json();
    });
}
