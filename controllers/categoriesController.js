const Category = require('../models/category');
const Item = require('../models/item');
const asyncHandler = require('express-async-handler');

// Display list of all Categories
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render('category_list', {
    title: 'Categories: ',
    category_list: allCategories,
  });
});

// Display details page for specific Category
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id, 'name'),
    Item.find({ category: req.params.id }),
  ]);

  if (category == null) {
    const error = new Error('Category not found');
    error.status = 404;
    next(error);
  }

  res.render('category_items', {
    title: `Category ${category.name}`,
    items: itemsInCategory,
  });
});

// Display Category create form on GET
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_form', { title: 'Create category' });
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
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Category update POST`);
});
