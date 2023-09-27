import { BASE_URL } from './config';

export async function sendFormData(data, formName) {
    const body = JSON.stringify(data);
    const headers = { 'content-type': 'application/json' };

    return await fetch(`${BASE_URL}/form/${formName}`, {
        method: 'POST',
        body: body,
        headers: headers,
    });
}
