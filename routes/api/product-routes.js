const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  Product.findAndCountAll({
    include: [
      {
        model: Category,
        attr: ['id', 'categoryName']
      },
      {
        model: Tag,
        attr: ['id', 'tagName']
      }
    ]
  })
  // be sure to include its associated Category and Tag data
  .then((data) => res.json(data))
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  Product.findOne({
    location: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        attr: ['id', 'categoryName']
      },
      {
        model: Tag,
        attr: ['id', 'tagName']
      }
    ]
  })
  .then((data) => res.json(data));
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create({
    productName: req.body.productName,
    stock: req.body.price,
    categoryID: req.body.categoryID,
    tagIDs: req.body.tagID,
    price: req.body.price
  })
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tagID) => {
          return {
            productID: product.id,
            tagID,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { productID: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tagID }) => tagID);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tagID) => !productTagIds.includes(tagID))
        .map((tagID) => {
          return {
            productID: req.params.id,
            tagID,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tagID }) => !req.body.tagIds.includes(tagID))
        .map(({ id }) => id)

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.delete({
    location: {
      id: req.params.id
    }
  })
  .then((data) => {
    res.json(data)
  })
  });

module.exports = router;
