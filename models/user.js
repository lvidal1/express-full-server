const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Password is required']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: [true, 'Role is required'],
        enum: ['admin', 'user']
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    return { ...user, uid: _id };
}


module.exports = model('User', UserSchema);