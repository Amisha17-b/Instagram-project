const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image: String,
    description: String,
    likes: { type: Number, default: 0 },
    comments: [String]
});

module.exports = mongoose.model('Post', postSchema);
