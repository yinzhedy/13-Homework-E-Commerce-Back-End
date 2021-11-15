const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAndCountAll({
    include: [
      {
        model: Product,
        attr: ['id', 'categoryID', 'productName', 'stock', 'price']
      }
    ]
  })
  .then((data) => res.json(data))
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    location: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attr: ['id', 'categoryID', 'productName', 'stock', 'price']
      }
    ]
  })
  .then((data) => res.json(data))
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tagName: req.body.tagName
  })
  .then((data) => res.json(data))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    location: {
      id: req.params.id
    }
  })
  .then((data) => res.jsom(data))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.delete(req.body, {
    location: {
      id: req.params.id
    }
  })
  .then((data) => res.jsom(data))
});

module.exports = router;
