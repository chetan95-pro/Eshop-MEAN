const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const mongoose = require("mongoose")

require("dotenv/config")
const api = process.env.API_URL

//Middleware
app.use(bodyParser.json())
app.use(morgan("tiny"))

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
})

const Product = mongoose.model("Product", productSchema)

//with the help for async and await method.
app.get(`${api}/products`, async (req, res) => {
  const productList = await Product.find()
  if (!productList) {
    res.status(500).json({ success: false })
  }
  res.send(productList)
})

//with the help of normal pormise method/function.
app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  })

  product
    .save()
    .then(createdProduct => {
      res.status(201).json(createdProduct)
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        success: false,
      })
    })
})

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database connection is ready")
  })
  .catch(err => {
    console.log(err)
  })

app.listen(3000, () => {
  console.log(api)
  console.log("Server is running https://localhost:3000")
})
