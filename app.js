const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")

require("dotenv/config")
const api = process.env.API_URL

app.use(cors())
app.options("*", cors)

//Product Router
const categoriesRoutes = require("./routers/categories")
const productRoutes = require("./routers/products")
const userRoutes = require("./routers/users")
const ordersRoutes = require("./routers/orders")

//Middleware
app.use(bodyParser.json())
app.use(morgan("tiny"))

//Routers
app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/products`, productRoutes)
app.use(`${api}/user`, userRoutes)
app.use(`${api}/order`, ordersRoutes)
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
