const Item = require('../models/item');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const category = require('../models/category');

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
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render(`item_form`, {
    title: 'Create product',
    categories: allCategories,
  });
});

// Handles Item create on POST
exports.item_create_post = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === 'undefined' ? [] : [req.body.category];
    }
    next();
  },

  // Validation middleware for input fields
  body('name', 'Name is required')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Name must be at lest 3 characters long'),
  body('description', 'Description is required')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Description must be at least 3 characters long'),
  body('price', 'Price is required')
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage('Price must be a numeric value')
    .isFloat({ min: 0 })
    .withMessage('Price must be greater than 0')
    .escape(),
  body('stock')
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage('Stock number must be numeric value')
    .isInt({ min: 0 })
    .withMessage('Stock number must be greater than or equal to 0')
    .escape(),
  // Escape category array elements
  body('category.*').escape(),

  // Controller logic
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Create item instance with validated values
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: parseFloat(req.body.price),
      numberInStock: parseInt(req.body.stock),
    });

    // Check for validations errors
    if (!errors.isEmpty()) {
      // Retrieve all categories for rendering the form again
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      // Mark selected categories so inputs are checked
      for (const category of allCategories) {
        if (item.category.includes(category._id)) {
          category.checked = 'true';
        }
      }
      // Render the form with errors and input data
      res.render('item_form', {
        title: 'Create product',
        item: item,
        categories: allCategories,
        errors: errors.array(), // Pass validation errors to the form
      });
      return;
    } else {
      item.save();
      res.redirect(item.url);
    }
  }),
];

// Displays Item delete form on GET
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  // Redirect to items list if item doesn't exist
  if (item === null) {
    res.redirect('/items');
  }

  // Render deletion form
  res.render(`item_delete`, { title: 'Delete product', item: item });
});

// Handle Item delete on POST
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const item = Item.findById(req.params.id);

  if (item == null) {
    res.redirect('/items');
  } else {
    await Item.findByIdAndDelete(req.body.itemId);
    res.redirect('/items');
  }

  res.send(`NOT IMPLEMENTED: Item delete POST`);
});

// Display Item update form on GET
exports.item_update_get = asyncHandler(async (req, res, next) => {
  // checkId middleware runs, attached from routes

  // Look DB for item and categories
  const [item, allCategories] = await Promise.all([
    Item.findById(req.params.id),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  // Make proper categories checked
  for (const category of allCategories) {
    if (item.category.includes(category._id)) {
      category.checked = 'true';
    }
  }

  // Render form with filled fields
  res.render('item_form', {
    title: 'Edit product',
    item: item,
    categories: allCategories,
  });
});

// Handle Item update on POST
exports.item_update_post = [
  // Middleware checks param id from routes

  // Convert the category to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === 'undefined' ? [] : [req.body.category];
    }
    next();
  },
  // Validation middleware for input fields
  body('name', 'Name is required')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Name must be at lest 3 characters long'),
  body('description', 'Description is required')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Description must be at least 3 characters long'),
  body('price', 'Price is required')
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage('Price must be a numeric value')
    .isFloat({ min: 0 })
    .withMessage('Price must be greater than 0')
    .escape(),
  body('stock')
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage('Stock number must be numeric value')
    .isInt({ min: 0 })
    .withMessage('Stock number must be greater than or equal to 0')
    .escape(),
  // Escape category array elements
  body('category.*').escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Create item instance with validated values
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: parseFloat(req.body.price),
      numberInStock: parseInt(req.body.stock),
      _id: req.params.id,
    });

    if (!errors.isEmpty) {
      // Retrieve all categories for rendering the form again
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      // Mark selected categories so inputs are checked
      for (const category of allCategories) {
        if (item.category.includes(category._id)) {
          category.checked = 'true';
        }
      }
      // Render form with errors
      res.render('item_form', {
        title: 'Edit product',
        item: item,
        categories: allCategories,
        errors: errors.array(),
      });
      return;
    } else {
      // Update item
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect(updatedItem.url);
    }
  }),
];
