import mongoose from 'mongoose';
import argon2 from 'argon2';
// import passport from 'passport';

// import findOrCreate from 'mongoose-findorcreate';

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
        password: { type: String },
        mfaEnabled: { type: Boolean, default: false },
        secretKey: String,
        permissionLevel: {
            type: String,
            default: 'user',
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            // immutable: true,
        },
        lastLogin: Date,
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        console.log('Password not modified');
        return next();
    }

    try {
        console.log('Attempting password hash');
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

// passport.use(User.createStrategy());

// // passport.serializeUser(User.serializeUser());
// // passport.deserializeUser(User.deserializeUser());

// passport.serializeUser(function(user, cb) {
//     process.nextTick(function() {
//         cb(null, { id: user.id, username: user.username });
//     });
// });

// passport.deserializeUser(function(user, cb) {
//     process.nextTick(function() {
//         return cb(null, user);
//     });
// });

const User = model('User', userSchema);
export default User;

// userSchema.plugin(passportLocalMongoose, {usernameLowerCase: true});
// userSchema.plugin(findOrCreate);

// // var secret = process.env.USERDB_SECRET;
// // userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

// const User = model('User', userSchema);
