const { Category } = require("../models/category")
const express = require("express")
const router = express.Router()

//with the help for async and await method.
//Get whole list
router.get(`/`, async (req, res) => {
  const categoryList = await Category.find()
  if (!categoryList) {
    res.status(500).json({ success: false })
  }
  res.status(200).send(categoryList)
})

//Get list by ID
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(500).json({ message: "The category with give ID was not found" })
  }
  res.status(200).status(category)
})

//Post Categories API..
router.post(`/`, async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  })

  category = await category.save()

  if (!category) return res.status(404).send("The categories can't be created")

  res.send(category)
})

//update API for categories (PUT Method we are using here..)

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    {
      new: true,
    }
  )
  if (!category) return res.status(404).send("The categories can't be created")

  res.send(category)
})

//Delete Category API by ID
router.delete(`/:id`, (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then(category => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: "The category is deleted",
        })
      } else {
        return res.status(404).json({
          success: false,
          message: "the category not found",
        })
      }
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err })
    })
})

//Exporting Router module for API Request
module.exports = router
