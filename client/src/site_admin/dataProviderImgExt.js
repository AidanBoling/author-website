import myDataProvider from './dataProvider';
import { fetchUtils } from 'react-admin';

const apiURL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

const baseDataProvider = myDataProvider;

const createImageFormData = params => {
    const formData = new FormData();
    params.data.image.rawFile &&
        formData.append('image', params.data.image.rawFile);
    params.data.title && formData.append('title', params.data.title);
    params.data.altText && formData.append('altText', params.data.altText);
    params.data.caption && formData.append('caption', params.data.caption);

    return formData;
};

export const dataProvider = {
    ...baseDataProvider,
    create: (resource, params) => {
        if (resource === 'images') {
            const formData = createImageFormData(params);
            return fetchUtils
                .fetchJson(`${apiURL}/${resource}`, {
                    method: 'POST',
                    body: formData,
                    headers: new Headers({
                        Accept: 'application/json',
                        // 'Content-Type': 'multipart/form-data',
                    }),
                    credentials: 'include',
                })
                .then(({ json }) => ({ data: { ...json, id: json._id } }));
        }
        return baseDataProvider.create(resource, params);
    },

    //   update: (resource, params) => {
    //     if (resource === "images") {
    //       const formData = createImageFormData(params);
    //       formData.append("id", params.id);
    //       return fetchUtils
    //         .fetchJson(`${apiURL}/${resource}`, {
    //           method: "PUT",
    //           body: formData,
    //         })
    //         .then(({ json }) => ({ data: { ...json, id: json._id } }));
    //     }

    //     return baseDataProvider.update(resource, params);
    //   },
};
