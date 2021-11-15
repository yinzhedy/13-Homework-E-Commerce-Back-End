

const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Shoes',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Dresses',
  },
  {
    category_name: 'Pants',
  },
  {
    category_name: 'Outerwear',
  },
];

function seedCategories() { Category.bulkCreate(categoryData); }


const { Product } = require('../models');

const productData = [
  {
    product_name: 'Crewneck',
    price: 14.99,
    stock: 14,
    category_id: 5,
  },
  {
    product_name: 'Running Sneakers',
    price: 90.0,
    stock: 25,
    category_id: 1,
  },
  {
    product_name: 'Branded Baseball Hat',
    price: 22.99,
    stock: 12,
    category_id: 2,
  },
  {
    product_name: 'A-line Party Dress',
    price: 12.99,
    stock: 50,
    category_id: 3,
  },
  {
    product_name: 'Capris',
    price: 29.99,
    stock: 22,
    category_id: 4,
  },
];

function seedProducts() {Product.bulkCreate(productData);}


const { ProductTag } = require('../models');

const tagData = [
  {
    productID: 1,
    tagID: 3,
  },
  {
    productID: 1,
    tagID: 8,
  },
  {
    productID: 1,
    tagID: 6,
  },
  {
    productID: 2,
    tagID: 7,
  },
  {
    productID: 3,
    tagID: 2,
  },
  {
    productID: 3,
    tagID: 3,
  },
  {
    productID: 3,
    tagID: 5,
  },
  {
    productID: 3,
    tagID: 4,
  },
  {
    productID: 4,
    tagID: 2,
  },
  {
    productID: 4,
    tagID: 3,
  },
  {
    productID: 4,
    tagID: 8,
  },
  {
    productID: 5,
    tagID: 3,
  },
];

function seedTagsforProducts() {ProductTag.bulkCreate(tagData)};


const { Tag } = require('../models');

const tagData = [
  {
    tagName: 'rock music',
  },
  {
    tagName: 'pop music',
  },
  {
    tagName: 'blue',
  },
  {
    tagName: 'red',
  },
  {
    tagName: 'green',
  },
  {
    tagName: 'white',
  },
  {
    tagName: 'gold',
  },
  {
    tagName: 'pop culture',
  },
];

function seedTags() {Tag.bulkCreate(tagData);}


const sequelize = require('../config/connection.js')

const seedAll = async () => {
    await sequelize.sync({ force: true});
    await seedCategories();
    await seedProducts();
    await seedTags();
    await seedTagsforProducts();
    process.exit();
}

seedAll();