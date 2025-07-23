const Post = require('../models/post.model');

exports.createPost = async (req, res) => {
    try {
        const { title, body, image } = req.body;

        const post = new Post({
            title,
            body,
            image,
            user: req.userId
        });

        await post.save();
        res.status(201).json({ status: 'post created', post });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Failed to create post' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'name email');
        res.status(200).json({ status: 'success', posts });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch posts' });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) return res.status(404).json({ status: 'error', message: 'Post not found' });
        if (post.user.toString() !== req.userId)
            return res.status(403).json({ status: 'error', message: 'Not authorized' });

        const { title, body, image } = req.body;
        if (title) post.title = title;
        if (body) post.body = body;
        if (image) post.image = image;

        await post.save();
        res.status(200).json({ status: 'success', post });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Failed to update post' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) return res.status(404).json({ status: 'error', message: 'Post not found' });
        if (post.user.toString() !== req.userId)
            return res.status(403).json({ status: 'error', message: 'Not authorized' });

        await post.deleteOne();
        res.status(200).json({ status: 'Successfully deleted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Failed to delete post' });
    }
};
