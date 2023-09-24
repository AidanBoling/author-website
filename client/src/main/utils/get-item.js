import { cache } from 'react';
import 'server-only';
import { BASE_URL } from './config';

export const preload = (id, resource) => {
    void getItemById(id, resource);
};

export const getItemById = cache(async (id, resource) => {
    return await fetch(`${BASE_URL}/${resource}/id/${id}`).then(response => {
        return response.json();
    });
});
