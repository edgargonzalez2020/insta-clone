const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserProfile = new Schema(
    {
        u_uid: {type: String, required: true},
        name: {type: String, required: true},
        gender: {type: String, required: true},
        dateOfBirth: {type: Date, required: false},
        location: {type: String, required: false},
        about: {type: String, required: false},
        userPic: {type: String, required: false},
        followings: {type: [String], required: false},
        followers: {type: [String], required: false},
    }
);
module.exports = mongoose.model('userProfile', UserProfile);
