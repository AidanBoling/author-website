import { getRelativeLoginTime } from '../utils/authUtilities.js';

// --Checks for when logged in:
export const loginTimeCheck = {
    ten: (req, res, next) => {
        const minutesSinceLogin = getRelativeLoginTime(req.user);

        if (minutesSinceLogin < 10) {
            next();
        } else {
            console.log('Login time check fail: Credential refresh required');
            res.status(401).json({ message: 'Credential refresh required' });
        }
    },

    fifteen: (req, res, next) => {
        const minutesSinceLogin = getRelativeLoginTime(req.user);

        if (minutesSinceLogin < 15) {
            next();
        } else {
            console.log('Login time check fail: Credential refresh required');
            res.status(401).json({ message: 'Credential refresh required' });
        }
    },

    max: (req, res, next) => {
        const minutesSinceLogin = getRelativeLoginTime(req.user);

        if (minutesSinceLogin < 1440) {
            //24hrs
            next();
        } else {
            console.log('Login time check fail: Credential refresh required');
            res.status(401).json({ message: 'Credential refresh required' });
        }
    },
};
