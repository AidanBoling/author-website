import { BASE_URL } from './config';

export async function getList(resource) {
    return await fetch(`${BASE_URL}/${resource}`).then(response => {
        return response.json();
    });
}

export async function getById(id, resource) {
    return await fetch(`${BASE_URL}/${resource}/id/${id}`).then(response => {
        return response.json();
    });
}
