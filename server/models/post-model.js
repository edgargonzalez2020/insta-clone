const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema(
    {
        useruid: {type: String, required: true, unique: true},
        uuid: {type: String, required: true, unique: true}, // post uid
        caption: {type: String, required: false},
        likesCount: {type: Number, required: true, default: 0},
        commentCount: {type: Number, required: true, default: 0},
        image: {type: String, required: false},
        creation: {type: Date, required: true, default: new Date()},
        comments: {type: [Object], required: false},
        userName: {type: String, required: false} // image uid
    }
);
module.exports = mongoose.model('post', Post);
