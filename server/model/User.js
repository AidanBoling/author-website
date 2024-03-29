import mongoose from 'mongoose';
import argon2 from 'argon2';

const { Schema, SchemaTypes, model } = mongoose;

const userSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            trim: true,
            required: [true, 'Email is missing'],
            unique: true,
        },
        password: String,
        mfa: {
            enabled: { type: Boolean, default: false },
            methodsVerified: { type: Number, default: 0 },
            defaultMethod: { type: String },
        },
        // mfaEnabled: { type: Boolean, default: false },
        // mfaDefaultMethod: { type: String },
        mfaAppSecret: String,
        mfaMethods: {
            authApp: {
                enabled: { type: Boolean, default: false },
                verified: { type: Boolean, default: false },
            },
            email: {
                enabled: { type: Boolean, default: false },
                verified: { type: Boolean, default: false },
            },
        },
        // permissionLevel: {
        //     type: String,
        //     default: 'user',
        // },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            // immutable: true,
        },
        lastLogin: [Date],
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        // console.log('Password not modified');
        return next();
    }

    try {
        console.log('Attempting password hash...');
        const hash = await argon2.hash(this.password, {
            memoryCost: 2 ** 14,
            parallelism: 3,
        });
        this.password = hash;
        return next();
    } catch (error) {
        console.log('Error hashing password: ', error.message);
        throw new Error('Error with hashing password');
    }
});

userSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    } // set createdAt if not yet set (e.g. if user created through Mongo Atlas --> no automatic create timestamp)
    next();
});

userSchema.pre('save', async function (next) {
    if (this.isModified('mfaMethods')) {
        // do calc of methodsVerified
        let n = 0;
        if (this.mfaMethods.authApp.verified) {
            n += 1;
        }
        if (this.mfaMethods.email.verified) {
            n += 1;
        }

        // this.mfa.methodsVerified = n;
        console.log('MFA methods count: ', n);
        this.mfa.methodsVerified = n;
    }

    return next();
});

userSchema.static('authenticate', async (username, plainTextPassword) => {
    const user = await User.findOne({ email: { $eq: username } });

    if (!user) {
        await argon2.hash(process.env.DUMMY_PWD, {
            memoryCost: 2 ** 14,
            parallelism: 3,
        });

        console.log('Invalid email');

        // return done(null, false, {
        //     message: 'Invalid email or password',
        // });
    }
    if (user && (await argon2.verify(user.password, plainTextPassword)))
        return user;

    return false;
});

userSchema.static('verifyIdEmailMatch', async (userId, email) => {
    const user = await User.findById(userId);

    if (!user) {
        console.log('No user with specified id');
    } else {
        if (user.email === email) return user;

        console.log('Id and email mismatch');
    }

    return false;
});

userSchema.static('saveLogin', user => {
    user.lastLogin.unshift(Date.now());
    if (user.lastLogin.length > 2) {
        user.lastLogin.pop();
    }
    user.save();
    console.log('Login list: ', user.lastLogin);
});

const User = model('User', userSchema);
export default User;
