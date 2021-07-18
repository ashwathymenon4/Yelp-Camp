//This file defines the User Schema.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

//Below plugin will add on username and passport to user schema.
UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', UserSchema);