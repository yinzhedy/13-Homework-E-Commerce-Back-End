const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAndCountAll({
    include: [
      {model: Product,
      attr: ['id', 'product_name', 'stock', 'price', 'category_id']}
    ]
  })
  .then(() => 
  data => res.json(data));
})

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    location: {
      id:req.params.id
    },
      // be sure to include its associated Products
    include: [
      {
        model: Product,
        attr: ['id', 'product_name', 'stock', 'price', 'category_id']
      }
    ]
  })
  .then((data) => {
    res.json(data)
  })
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
