import { BASE_URL } from './config';
import { cache } from 'react';
// const BASE_URL = process.env.BASE_API_URL

// TEST, get lists with preload, and cache:
export const preloadGetList = (resource, params) => {
    void getListCache(resource, params);
};

export const getListCache = cache(async (resource, params) => {
    let query = '';
    if (params) {
        const queryString = new URLSearchParams(params).toString();
        console.log(queryString);
        query = `?${queryString}`;
    }

    return await fetch(`${BASE_URL}/${resource}${query}`).then(response => {
        return response.json();
    });
});

// Regular way to get list, without preload and cache (delete if test works):

export async function getList(resource, params) {
    let query = '';
    if (params) {
        const queryString = new URLSearchParams(params).toString();
        console.log(queryString);
        query = `?${queryString}`;
    }

    return await fetch(`${BASE_URL}/${resource}${query}`).then(response => {
        return response.json();
    });
}

export async function getById(id, resource) {
    return await fetch(`${BASE_URL}/${resource}/id/${id}`).then(res => {
        if (res.status >= 200 && res.status < 300) {
            return res.json();
        } else {
            return undefined;
        }
    });
}
