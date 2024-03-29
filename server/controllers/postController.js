const Post = require('../models/Post');

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
