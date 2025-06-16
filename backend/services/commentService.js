const Comment = require('../models/comment');
const Article = require('../models/article');

// Service to create a new comment
exports.createComment = async (articleId, userId, message) => {
    const article = await Article.findById(articleId);
    if (!article) {
        throw new Error('article not found');
    }
    const comment = new Comment({
        message,
        user: userId,
        article: articleId,
    });
    return comment.save();
};

// Service to get all comments for a specific post
exports.getCommentsByArticleId = async (articleId) => {
    return Comment.find({ article: articleId })
        .populate('user', 'firstName lastName')
        .sort({ createdAt: -1 });
};
