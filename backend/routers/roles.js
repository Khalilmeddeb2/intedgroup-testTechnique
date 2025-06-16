const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { verifyToken, authorize } = require('../middlewares/auth');

router.post('/', verifyToken, authorize(['Admin']), roleController.createRole);
router.get('/', verifyToken, authorize(['Admin']), roleController.getAllRoles);
router.get('/:id', verifyToken, authorize(['Admin']), roleController.getRoleById);
router.put('/:id', verifyToken, authorize(['Admin']), roleController.updateRole);
router.delete('/:id', verifyToken, authorize(['Admin']), roleController.deleteRole);
router.get('/public/roles', roleController.getPublicRoles);

module.exports = router;
