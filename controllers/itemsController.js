const Item = require('../models/item');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

// Display list of all Items
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, 'name');

  res.render('items_list', { title: 'Items list', items: allItems });
});

// Display details page for specific Item
exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate('category').exec();

  if (item == null) {
    const error = new Error('Item does not exist');
    error.status = 404;
    next(error);
  }

  res.render('item_detail', { title: `Product description`, item: item });
});

// Display Item create form on GET
exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Item create GET:`);
});

// Handles Item create on POST
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Item create POST:`);
});

// Displays Item delete form on GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Item delete GET:`);
});

// Handle Item delete on POST
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Item delete POST`);
});

// Display Item update form on GET
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Item update GET`);
});

// Handle Item update on POST
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Item update POST`);
});
