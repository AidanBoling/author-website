import { API_URL } from './api/config';

function setRequest(path, body, method = 'POST', headers = {}) {
    headers = { 'Content-Type': 'application/json', ...headers };
    console.log('Request headers: ', headers);
    const request = new Request(API_URL + path, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: new Headers(headers),
        credentials: 'include',
    });

    return request;
}

function handleResponse(response) {
    if (response.status < 200 || response.status >= 300) {
        if (
            response.status === 400 ||
            response.status === 401 ||
            response.status === 403
        )
            throw new Error('Unauthorized');

        console.log('Request failed');
        throw new Error(`${response.status}`);
    }
    // If success:
    return response.json();
}

function handlePwdLogin(request) {
    return fetch(request)
        .then(response => handleResponse(response))
        .then(data => {
            console.log('Login response: ', data);
            // If returns mfa indicator, redirect to mfa page
            if (data.challenge === 'MFA') {
                localStorage.setItem(
                    'mfa',
                    JSON.stringify({
                        user: data.user,
                        preAuthToken: data.preAuthToken,
                    })
                );
                console.log(JSON.parse(localStorage.getItem('mfa')));
                return Promise.resolve({
                    redirectTo: '/auth-callback',
                });
            } else {
                localStorage.removeItem('mfa');
                localStorage.setItem('auth', true);
                return Promise.resolve();
            }
        })
        .catch(error => {
            console.log(error);
            if (error.message === 'Unauthorized') {
                console.log('Login request failed.');
                throw new Error('Invalid username or password');
            }
            throw new Error('Network error');
        });
}

function handleMFALogin(request) {
    return fetch(request)
        .then(response => handleResponse(response))
        .then(data => {
            console.log('MFA response: ', data);
            localStorage.removeItem('mfa');
            localStorage.setItem('auth', true);
            return Promise.resolve();
        })
        .catch(error => {
            console.log(error);
            if (error.message === 'Unauthorized') {
                console.log(
                    'MFA request failed. Deleting mfa item and redirecting...'
                );
                localStorage.removeItem('mfa');
                return { redirectTo: '/login' };
            }
            throw new Error('Network error');
        });
}

export const authProvider = {
    // authentication
    login: formInput => {
        console.log('Going through authProvider login route...');

        let reqPath;
        let reqBody;
        let reqHeaders;
        // let headers = { 'Content-Type': 'application/json' };

        //Deleting auth item (if one exists)...
        localStorage.removeItem('auth');

        if (localStorage.getItem('mfa')) {
            console.log('Setting up mfa request options');
            const { preAuthToken } = JSON.parse(localStorage.getItem('mfa'));
            // console.log('preAuthToken: ', preAuthToken);
            reqPath = '/login/mfa';
            reqBody = { OTPcode: formInput.code };
            reqHeaders = { Authorization: `Bearer ${preAuthToken}` };
        } else {
            const { username, password } = formInput;
            reqPath = '/login/password';
            reqBody = { email: username, password: password };
        }

        const request = setRequest(reqPath, reqBody, 'POST', reqHeaders);
        // const request = new Request(API_URL + reqPath, {
        //     method: 'POST',
        //     body: JSON.stringify(reqBody),
        //     headers: new Headers(headers),
        //     credentials: 'include',
        // });

        if (localStorage.getItem('mfa')) return handleMFALogin(request);

        return handlePwdLogin(request);
    },

    // handleCallback: code => {
    //     console.log('Starting handleCallback route...');
    //     const { preAuthToken } = JSON.parse(localStorage.getItem('mfa'));

    //     const request = new Request(API_URL + '/login/mfa', {
    //         method: 'POST',
    //         body: JSON.stringify({ OTPcode: code }),
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${preAuthToken}`,
    //         }),
    //         credentials: 'include',
    //     });

    //     return fetch(request)
    //         .then(response => {
    //             console.log('handleCallback request fetched');
    //             // If unauthorized or other errors:
    //             if (response.status < 200 || response.status >= 300) {
    //                 if (
    //                     response.status === 400 ||
    //                     response.status === 401 ||
    //                     response.status === 403
    //                 )
    //                     throw new Error('Unauthorized');

    //                 console.log('handleCallback request failed');
    //                 throw new Error(`${response.status}`); // --> May want to switch to this later, if need log out/vs. not log out actions (e.g., don't redirect for 500 status)?
    //             }

    //             // If success:
    //             return response.json();
    //         })
    //         .then(data => {
    //             localStorage.removeItem('mfa');
    //             localStorage.setItem('auth', true);
    //             return Promise.resolve();
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             if (error.message === 'Unauthorized') {
    //                 console.log('MFA request failed. Deleting mfa item...');
    //                 localStorage.removeItem('mfa');
    //                 // console.log('Returning rejected promise');
    //                 throw new Error({
    //                     logoutOnFailure: true,
    //                     message:
    //                         'Invalid or expired code. Please re-enter credentials.',
    //                 });
    //                 // console.log('Requesting redirect to login...');
    //                 // return { redirectTo: '/login' };
    //             }
    //             // throw new Error('Network error');
    //             // return Promise.reject({
    //             //     logoutOnFailure: true,
    //             //     message: error.message,
    //             // });
    //             throw new Error('Network error');
    //         });
    // },

    checkError: error => {
        const status = error.status;
        console.log('There was some kind of error!');
        localStorage.removeItem('mfa');

        if (status === 401 || status === 400) {
            console.log('Unauthorized or authentication expired');
            // localStorage.removeItem('auth');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },

    checkAuth: () => {
        console.log('Checking Auth...');
        // If have mfa item, redirect
        if (localStorage.getItem('mfa'))
            return Promise.resolve({ redirectTo: '/auth-callback' });
        // Note: ^might be able to actually check with the server for jwt valid, separately, before redirecting?

        // if (window.location.pathname === '/login/mfa') {
        //     console.log('Checking auth on mfa page...');
        //     return localStorage.getItem('mfa.preAuthToken')
        //         ? Promise.resolve()
        //         : Promise.reject();
        // }

        return localStorage.getItem('auth')
            ? Promise.resolve()
            : Promise.reject();
    },

    logout: async () => {
        console.log('Logging out');
        localStorage.removeItem('auth');
        localStorage.removeItem('mfa');

        const request = setRequest('/logout');
        // const request = new Request(`${API_URL}/logout`, {
        //     method: 'POST',
        //     headers: new Headers({ 'Content-Type': 'application/json' }),
        //     credentials: 'include',
        // });

        return fetch(request).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve();
            }
            throw new Error('Something went wrong with server logout.');
        });
    },

    getPermissions: () => Promise.resolve(''),

    getIdentity: async () => {
        console.log('Getting identity...');

        const request = setRequest('/auth/user', null, 'GET');

        try {
            const data = await fetch(request).then(response =>
                handleResponse(response)
            );

            if (data) {
                console.log('User data: ', data);
                const { id, fullName, avatar, email, lastLogin, mfaEnabled } =
                    data;
                return Promise.resolve({
                    id,
                    fullName,
                    avatar,
                    email,
                    lastLogin,
                    mfaEnabled,
                });
            }
            // const { id, fullName, avatar } = JSON.parse(
            //     localStorage.getItem('auth')
            // );
            //return Promise.resolve({id, fullName, avatar});
        } catch (error) {
            console.log(error);
            if (error.message === 'Unauthorized') {
                console.log('Identity request failed.');

                return authProvider.logout();
            }
            throw new Error('Something went wrong with fetching identity.');
        }
        // } catch (error) {
        //     return Promise.reject(error);
        // }
    },
};
