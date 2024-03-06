// ITEM ROUTES
const express = require('express');
const router = express.Router();

const item_controller = require('../controllers/itemsController');

router.get('/', item_controller.item_list);

// GET request for creating Item.
router.get('/create', item_controller.item_create_get);

// POST request for creating Item.
router.post('/create', item_controller.item_create_post);

// GET request to delete Item.
router.get('/:id/delete', item_controller.item_delete_get);

// POST request to delete Item.
router.post('/:id/delete', item_controller.item_delete_post);

// GET request to update Item.
router.get('/:id/update', item_controller.item_update_get);

// POST request to update Item.
router.post('/:id/update', item_controller.item_update_post);

// GET request for one Item.
router.get('/:id', item_controller.item_detail);

// GET request for list of all Items.
router.get('/', item_controller.item_list);

module.exports = router;
