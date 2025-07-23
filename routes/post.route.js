const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost
} = require('../controllers/post.controller');

const authMiddleware = require('../middlewares/auth.middleware');


router.post('/', authMiddleware, createPost);


router.get('/', getAllPosts);

router.put('/:postId', authMiddleware, updatePost);

router.delete('/:postId', authMiddleware, deletePost);

module.exports = router;
