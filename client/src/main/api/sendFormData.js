// import { BASE_URL } from './config';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function sendFormData(data, formName) {
    const body = JSON.stringify(data);
    const headers = { 'content-type': 'application/json' };

    return await fetch(`${BASE_URL}/form/${formName}`, {
        method: 'POST',
        body: body,
        headers: headers,
    });
}
