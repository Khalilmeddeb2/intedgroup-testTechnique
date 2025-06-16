const express = require('express');
const commentController = require('../controllers/commentController');
const { verifyToken } = require('../middlewares/auth');
const router = express.Router();

router.post('/:articleId', verifyToken,commentController.createComment);
router.get('/:articleId', verifyToken,commentController.getCommentsByArticleId);

module.exports = router;
