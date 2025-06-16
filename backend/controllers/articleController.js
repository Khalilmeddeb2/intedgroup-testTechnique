const articleService = require('../services/articleService');
const Article = require('../models/article');


exports.uploadImage = (req, res) => {
  res.status(200).json({ message: 'Image uploaded successfully' });
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await articleService.getArticleById(req.params.id);
    res.json(article);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const article = await articleService.createArticle({
      ...req.body,
      userId: req.userId
    });
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: "Save in DB Error: " + err.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const updatedArticle = await articleService.updateArticle(req.params.id, req.body);
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await articleService.deleteArticle(req.params.id);
    res.json(article);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.toggleLikeArticle = async (req, res) => {
    const { articleId } = req.params;
    try {
        const article = await articleService.toggleLikeArticle(articleId, req.userId);
        res.status(200).json(article);
    } catch (err) {
        const status = err.message === 'Article not found' ? 404 : 500;
        res.status(status).json({ message: err.message });
    }
};

exports.incrementView = async function(req, res) {
  try {
    const articleId = req.params.articleId;
    const article = await articleService.incrementView(articleId);
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
  }
};

exports.share = async function(req, res) {
  try {
    const articleId = req.params.articleId;
    const userId = req.userId;
    const article = await articleService.share(articleId, userId);
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Erreur serveur' });
  }
};

exports.getArticleStatistics = async (req, res) => {
  try {
    const articles = await Article.find({}, 'title likes views shares');

    const stats = articles.map(article => ({
      title: article.title,
      likes: article.likes.length,
      views: article.views,
      shares: article.shares.length
    }));

    res.status(200).json(stats);
  } catch (error) {
    console.error('Erreur dans getArticleStatistics:', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};


