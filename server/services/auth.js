import session from 'express-session';

export function checkAuth(req, res, next) {
    console.log('A protected route was called; checking auth...');
    console.log('Session is authenticated: ', req.isAuthenticated());
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: 'Not authorized' });
    } else {
        // console.log('session ID: ', req.sessionID);
        // console.log('user object: ', req.session.passport);
        console.log('Cookie expires: ', req.session.cookie._expires);
        next();
    }
}

export function cleanSession(req, res, next) {
    try {
        if (req.isAuthenticated() && req.user) {
            console.log('Session found at login: ', req.sessionID);
            console.log(req.session);

            console.log('Clearing cookie, destroying old session, ...');
            req.session.cookie.maxAge = 1;
            req.logout(error => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('User logged out');
                }
            });
            next();
            // req.session.destroy(() => next());
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}
