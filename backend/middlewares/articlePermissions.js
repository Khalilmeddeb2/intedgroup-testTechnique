const Article = require('../models/article');

async function canModifyArticle(req, res, next) {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    const userRole = req.userRole; 
    const userId = req.userId;

    if (userRole === 'Admin' || userRole === 'Editeur') {
      return next();
    }

    if (userRole === 'Redacteur' && article.user.toString() === userId) {
      return next();
    }

    if (userRole === 'Lecteur') {
      return res.status(403).json({ message: 'Access denied. You cannot modify this article.' });
    }

    return res.status(403).json({ message: 'Access denied. You cannot modify this article.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function canDeleteArticle(req, res, next) {
  try {
    const userRole = req.userRole;
    if (userRole === 'Admin') {
      return next(); 
    }

    return res.status(403).json({ message: 'Access denied. Only admins can delete articles.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { canModifyArticle, canDeleteArticle };
