const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

router.get('/', AdminController.getAll);
router.post('/', AdminController.create);
router.get('/:id', AdminController.getById);
router.delete('/:id', AdminController.delete);

module.exports = router;
