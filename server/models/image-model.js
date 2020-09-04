const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Image = new Schema(
    {
        i_uid: {type: String, required: true}, // image uid
        p_uid: {type: String, required: true}, // parent post uid
        path: {type: String, required: true}
    }
);
module.exports('image', Image);
