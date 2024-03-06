const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

// Display list of all Categories
exports.category_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Author list');
});

// Display details page for specific Category
exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Category Detail: ${req.params.id}`);
});

// Display Category create form on GET
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Category create GET:`);
});

// Handles Category create on POST
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Category create POST:`);
});

// Displays Category delete form on GET
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Category delete GET:`);
});

// Handle Category delete on POST
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Category delete POST`);
});

// Display Category update form on GET
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Category update GET`);
});

// Handle Category update on POST
exports.category_update.post = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Category update POST`);
});
