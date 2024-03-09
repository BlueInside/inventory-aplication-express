const Category = require('../models/category');
const Item = require('../models/item');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

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
    Category.findById(req.params.id),
    Item.find({ category: req.params.id }),
  ]);

  res.render('category_items', {
    title: `Category ${category.name}`,
    category: category,
    items: itemsInCategory,
  });
});

// Display Category create form on GET
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_form', { title: 'Create category' });
});

// Handles Category create on POST
exports.category_create_post = [
  body('name', 'Category must not be empty')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Product name must be longer than 3 characters'),
  body('description', ' Description must not be empty')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage(
      'Product description must be specified and longer than 3 characters'
    ),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create category',
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }),
];

// Displays Category delete form on GET
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, allItemsInCategory] = await Promise.all([
    Category.findById(req.params.id),
    Item.find({ category: req.params.id }),
  ]);

  if (category === null) {
    res.redirect('/categories');
  }
  res.render(`category_delete`, {
    title: 'Delete category',
    category: category,
    items: allItemsInCategory,
  });
});

// Handle Category delete on POST
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, allItemsInCategory] = await Promise.all([
    Category.findById(req.params.id),
    Item.find({ category: req.params.id }),
  ]);
  if (allItemsInCategory.length > 0) {
    res.render('category_delete', {
      title: 'Delete Category',
      category: category,
      items: allItemsInCategory,
    });
  } else {
    await Category.findByIdAndDelete(req.body.categoryId);
    res.redirect('/categories');
  }
  res.send(`NOT IMPLEMENTED: Category delete POST`);
});

// Display Category update form on GET
exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  res.render('category_form', { title: 'Edit product', category: category });
});

// Handle Category update on POST
exports.category_update_post = [
  body('name', 'Category must not be empty')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Product name must be longer than 3 characters'),
  body('description', ' Description must not be empty')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage(
      'Product description must be specified and longer than 3 characters'
    ),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Edit category',
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        category,
        {}
      );
      res.redirect(updatedCategory.url);
    }
  }),
];
