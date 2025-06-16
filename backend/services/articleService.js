const Article = require('../models/article');
const fs = require('fs');
const path = require('path');

exports.getAllArticles = async () => {
  return await Article.find().populate('user', 'firstName lastName');
};

exports.getArticleById = async (id) => {
  const article = await Article.findById(id);
  if (!article) throw new Error('Article ID not found');
  return article;
};

exports.createArticle = async ({ title, content, image, key, tags, userId }) => {
  const article = new Article({ title, content, image, key, tags, user: userId });
  return await article.save();
};

exports.updateArticle = async (id, updateData) => {
  const article = await Article.findById(id);
  if (!article) throw new Error('Article ID not found');
  article.title = updateData.title || article.title;
  article.content = updateData.content || article.content;
  article.image = updateData.image || article.image;
  article.key = updateData.key || article.key;
  article.tags = updateData.tags || article.tags;

  return await article.save();
};

exports.deleteArticle = async (id) => {
  const article = await Article.findByIdAndDelete(id);
  if (!article) throw new Error('Article ID not found');
  return article;
};

exports.toggleLikeArticle = async (articleId, userId) => {
    const article = await Article.findById(articleId);
    if (!article) {
        throw new Error('article not found');
    }

    if (article.likes) {
        const index = article.likes.indexOf(userId);
        if (index > -1) {
            article.likes.splice(index, 1);
        } else {
            article.likes.push(userId);
        }
    } else {
        article.likes = [userId];
    }
    return article.save(); 
}

exports.incrementView = async function(articleId) {
  const article = await Article.findById(articleId);
  if (!article) {
    const error = new Error('Article not found');
    error.status = 404;
    throw error;
  }
  article.views = (article.views || 0) + 1;
  await article.save();
  return article;
};

exports.share = async function(articleId, userId) {
  const article = await Article.findById(articleId);
  if (!article) {
    const error = new Error('Article not found');
    error.status = 404;
    throw error;
  }
  if (!article.shares.includes(userId)) {
    article.shares.push(userId);
  }
  await article.save();
  return article;
};


exports.prepareImageStorage = (key) => {
  const basePath = `media/articles/${key}/`;

  if (fs.existsSync(basePath)) {
    fs.rmSync(basePath, { recursive: true, force: true });
  }

  fs.mkdirSync(basePath, { recursive: true });

  return basePath;
};
