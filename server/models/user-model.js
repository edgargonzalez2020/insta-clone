const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema (
    {
        name: {type: String, required: false},
        email: {type: String, required: true},
        password: {type: String, required: true},
        uid: {type: String, required: true},
        userName: {type: String, required: true},
        posts: {type: String, required: false}
    }
);
module.exports = mongoose.model('user', User);
