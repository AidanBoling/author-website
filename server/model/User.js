import mongoose from 'mongoose';
// import passport from 'passport';
// import passportLocalMongoose from 'passport-local-mongoose';
// import findOrCreate from 'mongoose-findorcreate';

const { Schema, SchemaTypes, model } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: [true, 'Username is missing'] },
    password: { type: String, required: [true, 'Password is missing'] },
    permissionLevel: {
        type: String,
        default: 'siteOwner',
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: Date,
    lastLogin: Date,
});

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // update the date every time document is saved (may be useful to track password changes?)
    next();
});

// userSchema.plugin(passportLocalMongoose, {usernameLowerCase: true});
// userSchema.plugin(findOrCreate);

// // var secret = process.env.USERDB_SECRET;
// // userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

// const User = model('User', userSchema);

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
