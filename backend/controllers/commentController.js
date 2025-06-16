const commentService = require('../services/commentService');

exports.createComment = async (req, res) => {
    const { message } = req.body; 
    const { articleId } = req.params; 

    try {
        const comment = await commentService.createComment(articleId, req.userId, message);
        const populatedComment = await comment.populate('user', 'firstName lastName');
        const io = req.app.get('io');
        io.emit(`commentAddedToArticle:${articleId}`, populatedComment);
        res.status(201).json(comment);
    } catch (err) {
        const status = err.message === 'article not found' ? 404 : 400;
        res.status(status).json({ message: err.message });
    }
};

exports.getCommentsByArticleId = async (req, res) => {
    const { articleId } = req.params; // Extract postId from request parameters

    try {
        const comments = await commentService.getCommentsByArticleId(articleId);
        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json({ message: 'Error retrieving comments', error: err.message });
    }
};
