// ITEM ROUTES
const express = require('express');
const mongoose = require('mongoose');

// Middleware that checks if id in url is valid
const checkId = (req, res, next) => {
  const isValidId = mongoose.isValidObjectId(req.params.id);
  if (!isValidId) {
    const error = new Error('Category not found');
    error.status = 404;
    return next(error);
  }
  next();
};

const router = express.Router();

const item_controller = require('../controllers/itemsController');

router.get('/', item_controller.item_list);

// GET request for creating Item.
router.get('/create', item_controller.item_create_get);

// POST request for creating Item.
router.post('/create', item_controller.item_create_post);

// GET request to delete Item.
router.get('/:id/delete', checkId, item_controller.item_delete_get);

// POST request to delete Item.
router.post('/:id/delete', checkId, item_controller.item_delete_post);

// GET request to update Item.
router.get('/:id/update', checkId, item_controller.item_update_get);

// POST request to update Item.
router.post('/:id/update', checkId, item_controller.item_update_post);

// GET request for one Item.
router.get('/:id', checkId, item_controller.item_detail);

// GET request for list of all Items.
router.get('/', item_controller.item_list);

module.exports = router;
