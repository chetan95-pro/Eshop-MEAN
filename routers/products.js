const { Product } = require("../models/product")
const { Category } = require("../models/category")
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

///Get All list of Products..
router.get(`/`, async (req, res) => {
  let filter = {}

  if (req.query.categories) {
    const filter = { category: req.query.categories.split(",") }
  }
  const productList = await Product.find(filter).populate("category")
  if (!productList) {
    res.status(500).json({ success: false })
  }
  res.send(productList)
})

//Get list of product By ID.
router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category")

  if (!product) return res.status(500).json({ success: false })
  res.send(product)
})

//with the help of normal pormise method/function.
router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category)
  if (!category) return res.status(400).send("Invalid Category")

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  })

  product = await product.save()

  if (!product) return res.status(500).send("The product cannot be created")

  res.send(product)
})

//update API for product (PUT Method we are using here..)

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id")
  }
  const category = await Category.findById(req.body.category)
  if (!category) return res.status(400).send("Invalid Category")

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true,
    }
  )
  if (!product) return res.status(500).send("The product can't be update")

  res.send(product)
})

//Delete Product API by ID
router.delete(`/:id`, (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(product => {
      if (product) {
        return res.status(200).json({
          success: true,
          message: "The product is deleted",
        })
      } else {
        return res.status(404).json({
          success: false,
          message: "the product not found",
        })
      }
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err })
    })
})

//Counting the products in Database for Admin Panel
// router.get(`/get/count`, async (req, res) => {
//   try {
//     const productCount = await Product.countDocuments(count => count)
//     if (!productCount) {
//       res.status(500).json({ success: false })
//     }
//     res.send({
//       productCount: productCount,
//     })
//   } catch (err) {
//     res.send(err)
//   }
// })

//Feature the products in Database for Admin Panel
router.get(`/get/featured/:count`, async (req, res) => {
  const count = req.params.count ? req.params.count : 0
  const product = await Product.find({ isFeatured: true }).limit(+count)
  if (!product) {
    res.status(500).json({ success: false })
  }
  res.send(product)
})

module.exports = router
