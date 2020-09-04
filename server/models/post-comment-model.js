const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostComment = new Schema(
    {
        puid: {type: String, required: true}, // parent uid
        text: {type: String, required: true},
    }
);
module.exports('postComment', PostComment);
