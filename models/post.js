const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: String,
    likes: Number,
    comments: [],
    date: {type: Date, default: Date.now},
    follow: {type: Boolean, default: false} 
}, 
);

module.exports = mongoose.model('postSch', postSchema);