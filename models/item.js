// Require mongoose
const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 200 },
  description: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  price: { type: mongoose.Decimal128, required: true },
  numberInStock: { type: Number, min: 0, required: true },
});

// Virtual for item's URL
ItemSchema.virtual('url').get(function () {
  return `/items/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);
