const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        trime: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
        required: [true, 'Email is required']
    },
    hashedPassword: {
        type: String,
        required: [true, 'Password is required']
    },
    salt: {
        type: String
    }
});

userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptedPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptedPassword(plainText) === this.hashedPassword;
    },
    encryptedPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

userSchema.path('hashedPassword').validate(function (v) {
    if (this.hashedPassword && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters long.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required.');
    }
}, null);

module.exports = User = mongoose.model('user', userSchema);