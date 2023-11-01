import { BASE_URL } from './config';

export async function getList(resource, params) {
    let query = '';
    if (params) {
        const queryString = new URLSearchParams(params).toString();
        // console.log(queryString);
        // const queryString = Object.keys(params)
        //     .map(key => key + '=' + params[key])
        //     .join('&');
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
