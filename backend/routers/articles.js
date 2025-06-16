const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { verifyToken , authorize } = require('../middlewares/auth');
const { canModifyArticle, canDeleteArticle } = require('../middlewares/articlePermissions');
const upload = require('../middlewares/multerStorage');

router.post('/upload/image/:key', upload.single('image'), articleController.uploadImage);
router.get('/statistics', verifyToken, authorize(['Admin']), articleController.getArticleStatistics);
router.get('/',verifyToken, articleController.getAllArticles);
router.get('/:id', verifyToken,articleController.getArticleById);
router.post('/', verifyToken, articleController.createArticle);
router.put('/:id', verifyToken, canModifyArticle,articleController.updateArticle); 
router.delete('/:id', verifyToken,canDeleteArticle, articleController.deleteArticle);
router.put('/like/:articleId',verifyToken, articleController.toggleLikeArticle);
router.patch('/increment-view/:articleId', verifyToken, articleController.incrementView);
router.patch('/share/:articleId', verifyToken, articleController.share);





module.exports = router;

