import { API_URL } from './api/config';

function setRequest(path, body, method = 'POST', headers = {}) {
    headers = { 'Content-Type': 'application/json', ...headers };
    // console.log('Request headers: ', headers);
    const request = new Request(API_URL + path, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: new Headers(headers),
        credentials: 'include',
    });

    return request;
}

function parseResponse(response) {
    return response
        .json()
        .then(data => ({ status: response.status, body: data }));
}

function handleResponse({ status, body }, passValidationErrors = false) {
    console.log('Handling response...');
    // console.log('Response content: ', body);

    // If unauthorized or other error:
    // function handleStatusNotOk(res)
    if (status < 200 || status >= 300) {
        if (
            status === 400 &&
            body.errorType === 'validation' &&
            passValidationErrors
        ) {
            return { validationError: body.error };
        } else if (status === 400 || status === 401 || status === 403)
            throw new Error('Unauthorized');
        console.log('Request failed');
        throw new Error(`${status}`);
    }

    // If success:
    return body;
}

// function handleResponse(response) {

//     // If unauthorized or other error:
//     function handleStatusNotOk(res)
//     if (response.status < 200 || response.status >= 300) {
//         if (response.status === 401 || response.status === 403)
//             throw new Error('Unauthorized');
//         else if (response.status === 400) {
//             const resContent = response.json();
//             console.log('400 Error response content: ', resContent);
//             throw new Error(`${resContent.error}`);
//         }
//         console.log('Request failed');
//         throw new Error(`${response.status}`);
//     }

//     // If success:
//     return response.json();
// }

function handleIsAuthenticated() {
    // const redirectUrl = localStorage.getItem('redirect');

    localStorage.removeItem('mfa');
    localStorage.setItem('auth', true);

    // if (redirectUrl) {
    //     console.log('Redirect request found -- path: ', redirectUrl);
    //     loginWithRedirect(redirectUrl)
    //     throw new Error("Intentional error to prevent react-admin from redirecting")
    // }

    // localStorage.removeItem('redirect');
    return Promise.resolve();
}

function handlePwdLogin(request) {
    return fetch(request)
        .then(response => parseResponse(response))
        .then(response => handleResponse(response))
        .then(data => {
            console.log('Login response: ', data);

            // If returns mfa indicator, redirect to mfa page
            if (data.challenge === 'MFA') {
                // console.log('mfa info: ', data.mfa);
                localStorage.setItem(
                    'mfa',
                    JSON.stringify({
                        user: data.user,
                        preAuthToken: data.preAuthToken,
                        info: data.mfa,
                    })
                );
                console.log(JSON.parse(localStorage.getItem('mfa')));
                return Promise.resolve({
                    redirectTo: '/auth-callback',
                });
            } else {
                handleIsAuthenticated();
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
        .then(response => parseResponse(response))
        .then(response => handleResponse(response))
        .then(data => {
            // console.log('MFA response: ', data);
            handleIsAuthenticated();
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

// Used on custom methods when need to return error responses to user (via Notify)
async function fetchWithThrow(
    request,
    errorUnauthorizedMsg,
    errorMsg = 'Server error',
    passValidationErrors = false
) {
    try {
        const data = await fetch(request)
            .then(response => parseResponse(response))
            .then(response => handleResponse(response, passValidationErrors));
        if (data.validationError)
            return { validationError: data.validationError };
        return data.message;
    } catch (error) {
        console.log(error);
        if (error.message === 'Unauthorized') {
            throw new Error(errorUnauthorizedMsg);
        }
        throw new Error(errorMsg);
    }
}

export const authProvider = {
    login: formInput => {
        console.log('Going through login route...');

        let reqPath;
        let reqBody;
        let reqHeaders;

        //Deleting mfa item (if one exists)...
        localStorage.removeItem('auth');

        if (
            location.hash === '#/auth-callback' &&
            localStorage.getItem('mfa')
        ) {
            console.log('Setting up mfa request options');
            // console.log('Code: ', formInput.code);

            const { preAuthToken } = JSON.parse(localStorage.getItem('mfa'));
            reqPath = '/login/mfa';
            reqBody = { method: formInput.method, otpCode: formInput.code };
            reqHeaders = { Authorization: `Bearer ${preAuthToken}` };
        } else {
            localStorage.removeItem('mfa');
            const { username, password } = formInput;
            reqPath = '/login/password';
            reqBody = { email: username, password: password };
        }

        const request = setRequest(reqPath, reqBody, 'POST', reqHeaders);

        if (location.hash === '#/auth-callback' && localStorage.getItem('mfa'))
            return handleMFALogin(request);

        return handlePwdLogin(request);
    },

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

    checkAuth: async params => {
        console.log('Checking Auth at path: ', location.hash);

        // On accessCode page, do nothing
        if (location.hash === '#/use/code') {
            return;
        }

        // On register and password reset pages, check for correct auth
        const registerHash = /^#\/register/;
        const passwordResetHash = /^#\/passwordReset/;
        if (
            registerHash.test(location.hash) ||
            passwordResetHash.test(location.hash)
        ) {
            let purpose;
            if (registerHash.test(location.hash)) {
                purpose = 'register';
            }
            if (passwordResetHash.test(location.hash)) {
                purpose = 'passwordReset';
            }
            // console.log('Hash matches a pattern. Purpose: ', purpose);

            // If no params, do nothing (pages set to send urlsearchparams)
            if (Object.keys(params).length === 0) {
                return;
            }

            // console.log('Params: ', params);

            // TODO: Add some sort of validation of id and token params here, so if
            // not correct format, doesn't even go to api (may help with DDoS or something?? Check...)

            const request = setRequest('/mod/checkAuth', {
                purpose: purpose,
                ...params,
            });

            try {
                const data = await fetch(request)
                    .then(response => parseResponse(response))
                    .then(response => handleResponse(response));
                return Promise.resolve();
            } catch (error) {
                console.log(error.message);
                if (error.message === 'Unauthorized')
                    return Promise.reject({
                        message: 'Unauthorized',
                        redirectTo: '/',
                    });

                return Promise.reject({
                    message: 'An unexpected error occurred.',
                    redirectTo: '/',
                });
            }
        }

        // If have mfa item, redirect
        if (localStorage.getItem('mfa')) {
            if (location.hash !== '#/auth-callback') {
                console.log(
                    'Not on auth-callback; redirecting and logging out...'
                );
                return Promise.reject({
                    message: 'An unexpected error occurred.',
                });
                // return Promise.reject({ redirectTo: '/auth-callback' });
            }
            // Note: ^might be able to actually check with the server for jwt valid, separately, before redirecting?

            if (location.hash === '#/auth-callback') {
                console.log('Starting mfa auth check request...');

                const { preAuthToken } = JSON.parse(
                    localStorage.getItem('mfa')
                );
                const path = '/login/mfa/checkAuth';
                const header = { Authorization: `Bearer ${preAuthToken}` };
                const request = setRequest(path, null, 'GET', header);

                try {
                    const data = await fetch(request)
                        .then(response => parseResponse(response))
                        .then(response => handleResponse(response));
                    console.log('Success');
                    return Promise.resolve();
                    // return Promise.resolve({ redirectTo: '/auth-callback' });
                } catch (error) {
                    console.log(error.message);
                    if (error.message === 'Unauthorized')
                        return Promise.reject({
                            message: 'Unauthorized',
                        });

                    return Promise.reject({
                        message: 'An unexpected error occurred.',
                    });
                }
            }
        }

        if (localStorage.getItem('auth')) {
            const securityHash = /^#\/user\/security/;
            if (securityHash.test(location.hash)) {
                let request;
                if (location.hash === '#/user/security') {
                    request = setRequest('/auth/check-login/1', null, 'GET');
                }
                if (location.hash === '#/user/security/enable-mfa') {
                    request = setRequest('/auth/check-login/2', null, 'GET');
                }

                // Check user's most recent Login time. If server doesn't
                // send ok, trigger logout.

                try {
                    const response = await fetch(request)
                        .then(response => parseResponse(response))
                        .then(response => handleResponse(response))
                        .then(() => Promise.resolve());
                } catch (error) {
                    if (error.message === 'Unauthorized') {
                        const currentPath = location.hash.replace('#', '');

                        return Promise.reject({
                            redirectTo: currentPath,
                            message: 'Please renew your credentials',
                        });
                    }
                    return Promise.reject({
                        redirectTo: '/user',
                        message:
                            'An unexpected error occurred. Please log back in to continue.',
                    });
                }
            }
            console.log('Resolving auth check');
            return Promise.resolve();
        }
        return Promise.reject();
    },

    logout: async () => {
        console.log('Logging out...');

        const request = setRequest('/logout');

        localStorage.removeItem('auth');
        localStorage.removeItem('mfa');
        return fetch(request)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve();
                }
                throw new Error('Something went wrong with server logout.');
            })
            .catch(error => console.log('Error: ', error.message));
    },

    getPermissions: () => Promise.resolve(''),

    getIdentity: async () => {
        //Skip get Identity if user not logged in
        if (!localStorage.getItem('auth')) {
            console.log('Skipping get identity...');
            return;
        }

        console.log('Getting identity...');

        const request = setRequest('/auth/user', null, 'GET');

        try {
            const data = await fetch(request)
                .then(response => parseResponse(response))
                .then(response => handleResponse(response));

            if (data) {
                // console.log('User data: ', data);
                const { id, fullName, avatar, email, lastLogin, mfa } = data;
                return Promise.resolve({
                    id,
                    fullName,
                    avatar,
                    email,
                    lastLogin,
                    mfa,
                });
            }
        } catch (error) {
            console.log(error);
            if (error.message === 'Unauthorized') {
                console.log('Identity request failed.');

                return authProvider.logout();
            }
            throw new Error('Something went wrong with fetching identity.');
        }
    },

    settings: {
        enableMFAMethod: async method => {
            console.log('Method submitted: ', method);
            const request = setRequest('/auth/settings/mfa/setup', {
                method: method,
            });

            try {
                // Will return otp code info (auth app), or send email with otp code
                const data = await fetch(request)
                    .then(response => parseResponse(response))
                    .then(response => handleResponse(response));
                return data;
            } catch (error) {
                console.log(error);
                if (error.message !== 'Unauthorized') {
                    console.log('Server error');
                    throw new Error('Server error');
                }
                //CHECK: does this work? May not, if has to be called directly
                // from the page being checked. If not, can maybe instead copy the
                // error portion of checkAuth, then call authProvider.logout()...?
                return authProvider.checkAuth();
            }
        },

        verifyMFAMethod: async (method, code) => {
            const request = setRequest('/auth/settings/mfa/verify', {
                method: method,
                otpCode: code,
            });
            const errorUnauthorizedMsg = 'Code invalid or expired';

            return fetchWithThrow(request, errorUnauthorizedMsg);
        },

        disableMFA: async () => {
            // TODO ...
        },

        changePassword: async formData => {
            const { currentPassword, password, confirmPassword } = formData;
            const request = setRequest('/auth/settings/change/password', {
                currentPassword: currentPassword,
                password: password,
                confirmPassword: confirmPassword,
            });
            const errorUnauthorizedMsg = 'Current password invalid';
            const errorOtherMsg = 'Server error. Password not changed.';

            return fetchWithThrow(
                request,
                errorUnauthorizedMsg,
                errorOtherMsg,
                true
            );
        },

        changeName: async formData => {
            const { name } = formData;
            const request = setRequest('/auth/settings/change/name', {
                name: name,
            });
            const errorUnauthorizedMsg = 'Error: Unauthorized';
            const errorOtherMsg = 'Server error. User info not changed.';

            return fetchWithThrow(request, errorUnauthorizedMsg, errorOtherMsg);
        },
    },

    sendEmailCode: async () => {
        const mfa = JSON.parse(localStorage.getItem('mfa'));
        const request = setRequest('/login/mfa/email', {
            email: mfa.user,
        });

        const errorUnauthorizedMsg = 'Invalid credentials';
        const errorOtherMsg = 'Server error. Contact your site admin.';

        console.log('Starting email send fetch...');
        return fetchWithThrow(request, errorUnauthorizedMsg, errorOtherMsg);

        // try {
        //     const data = await fetch(request)
        //         .then(response => parseResponse(response))
        //         .then(response => handleResponse(response));
        //     return data.message;
        // } catch (error) {
        //     console.log(error);
        //     if (error.message !== 'Unauthorized') {
        //         console.log('Server error');
        //         throw new Error('Server error');
        //     }
        //     throw new Error('Invalid credentials');
        // }
    },

    // TODO: Test this route
    submitAccessCode: async code => {
        const request = setRequest('/use/code', { code: code });

        // Only logging server error, b/c not taking actions on success/failure
        try {
            const data = await fetch(request)
                .then(response => parseResponse(response))
                .then(response => handleResponse(response));
        } catch (error) {
            console.log(error);
            if (error.message !== 'Unauthorized') {
                console.log('Server error');
            }
        }
    },

    preAuthUser: {
        register: async (formData, params) => {
            const { name, email, password, confirmPassword } = formData;
            const request = setRequest('/mod/register', {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                purpose: 'register',
                ...params,
            });

            // Q: Need to change this? Need different error handling/routing, for security?
            const errorUnauthorizedMsg = 'Invalid or expired credentials';
            const errorOtherMsg = 'Server error. Contact your site admin.';
            return fetchWithThrow(
                request,
                errorUnauthorizedMsg,
                errorOtherMsg,
                true
            );
        },

        resetPassword: async (formData, params) => {
            const { email, password, confirmPassword } = formData;
            const request = setRequest('/mod/password-reset', {
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                purpose: 'passwordReset',
                ...params,
            });

            // Q: Need to change this? Need different error handling/routing, for security?
            const errorUnauthorizedMsg = 'Invalid or expired credentials';
            const errorOtherMsg = 'Server error. Contact your site admin.';
            return fetchWithThrow(
                request,
                errorUnauthorizedMsg,
                errorOtherMsg,
                true
            );
        },
    },
};

// Notes: ideas for server "bouncer" -- cool-down code-entry period of 5 min? For everyone, regardless of ip, etc (since very limited number of users)
// and maybe... add a use-limit to code; ex, every time code checked, use increases by 1; if use gets to 3, code is invalidated/deleted?
// (Prob not critical, b/c of needing access to email for link anyways)

// TODO: Troubleshoot security pages -- checkAuth not working
// as expected -- not timing out (to login page or otherwise)

// TODO: Add validation to UserForm fields
// TODO: change pwd fields to type='password'

// TODO: Move functions at top of page to separate page(s)

// TODO: check access code exp. is 1hr
// TODO: update access code

// TODO: check all admin components that need it have 'use client'

//
//
// TEMP Archive ------------------------------
//
// if (
//     location.hash === '#/user/security' ||
//     location.hash === '/user/security/enable-mfa'
// ) {}

// Check user's most recent Login time. If server doesn't
// send ok: save page url, then trigger logout.

// Note: Saving page url is workaround -- for some reason, RA only redirects to
// last-viewed page for idle logouts (triggered due to credential expiration),
// otherwise redirects to Dashboard. Unable to get the built-in "redirectTo"
// on login success to work for me.
// Workaround is to have Dashboard page trigger the redirect to the saved url.

// const currentPage =
//     window.location.origin + '/admin' + location.hash;
// localStorage.setItem(
//     'redirect',
//     window.location.origin + '/admin' + location.hash
// );

//
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
