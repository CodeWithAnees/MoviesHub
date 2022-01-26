const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);
router.get('/postsSorted', feedController.getSortedPosts);
router.get('/post/:postId', feedController.getPost);
// POST /feed/post
router.post(
  '/post',
  [
    body('name')
  ],
  feedController.getOnePost
);

router.put(
  '/post/:postId',
  [
    body('upvote')
  ],
  feedController.updatePost
);

router.put(
  '/postDown/:postId',
  [
    body('downvote')
  ],
  feedController.updatePostDown
);
module.exports = router;
