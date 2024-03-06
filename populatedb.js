#! /usr/bin/env node
require('dotenv').config();

console.log(
  'This script populates categories and items. Specified database as process.env - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require('./models/item');
const Category = require('./models/category');

const items = [];
const categories = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');

  await createCategories();
  console.log('Debug: Categories populated');

  await createItems();
  console.log('Debug: Items populated');

  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(
  index,
  name,
  description,
  category,
  price,
  numberInStock
) {
  const itemDetail = {
    name: name,
    description: description,
    price: price,
    numberInStock: numberInStock,
  };

  if (category != false) itemDetail.category = category;

  const item = new Item(itemDetail);

  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate(0, 'Bakery', 'Bakery and Bread.'),
    categoryCreate(1, 'Produce', 'Fresh fruits and vegetables.'),
    categoryCreate(2, 'Dairy', 'Dairy products like milk, cheese, and yogurt.'),
    categoryCreate(3, 'Meat', 'Fresh and frozen meats.'),
    categoryCreate(
      4,
      'Frozen Foods',
      'Frozen foods including vegetables, meals, and desserts.'
    ),
    categoryCreate(
      5,
      'Beverages',
      'Non-alcoholic beverages like juices and sodas.'
    ),
  ]);
}

async function createItems() {
  console.log('Adding items');
  await Promise.all([
    itemCreate(
      0,
      'Baguette',
      'Freshly baked baguette.',
      [categories[0], categories[1]],
      3.99,
      50
    ),
    itemCreate(
      1,
      'Apple',
      'Crisp and juicy apple.',
      [categories[1]],
      1.49,
      100
    ),
    itemCreate(
      2,
      'Cheddar Cheese',
      'Sharp cheddar cheese.',
      [categories[2]],
      5.99,
      30
    ),
    itemCreate(
      3,
      'Chicken Breast',
      'Boneless, skinless chicken breast.',
      [categories[3]],
      8.99,
      20
    ),
    itemCreate(
      4,
      'Frozen Pizza',
      'Classic pepperoni frozen pizza.',
      [categories[4]],
      7.99,
      40
    ),
    itemCreate(
      5,
      'Orange Juice',
      'Freshly squeezed orange juice.',
      [categories[5]],
      2.99,
      80
    ),
    itemCreate(
      6,
      'Multigrain Bread',
      'Healthy multigrain bread.',
      [categories[0], categories[1]],
      4.49,
      60
    ),
    itemCreate(
      7,
      'Gala Apple',
      'Sweet and crunchy gala apple.',
      [categories[1]],
      1.99,
      70
    ),
    itemCreate(
      8,
      'Mozzarella Cheese',
      'Creamy mozzarella cheese.',
      [categories[2]],
      6.49,
      25
    ),
    itemCreate(
      9,
      'Ground Beef',
      'Lean ground beef.',
      [categories[3]],
      7.49,
      35
    ),
  ]);
}
