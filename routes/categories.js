const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// Middleware that checks if id in url is valid id
const checkId = (req, res, next) => {
  const isValidId = mongoose.isValidObjectId(req.params.id);
  if (!isValidId) {
    const error = new Error('Category not found');
    error.status = 404;
    return next(error);
  }
  next();
};

//Require controller modules
const category_controller = require('../controllers/categoriesController');

// GET request for list of all Categories items
router.get('/', category_controller.category_list);

// GET request for creating a Category
router.get('/create', category_controller.category_create_get);

// POST request for creating Category
router.post('/create', category_controller.category_create_post);

// GET request to delete Category
router.get('/:id/delete', checkId, category_controller.category_delete_get);

// POST request to delete Category
router.post('/:id/delete', checkId, category_controller.category_delete_post);

// GET request to update Category.
router.get('/:id/update', checkId, category_controller.category_update_get);

// POST request to update Category.
router.post('/:id/update', checkId, category_controller.category_update_post);

// GET request for one Category
router.get('/:id', checkId, category_controller.category_detail);

module.exports = router;
