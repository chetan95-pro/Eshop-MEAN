const { Order } = require("../models/category")
const express = require("express")
const router = express.Router()

//with the help for async and await method.
router.get(`/`, async (req, res) => {
  const orderList = await order.find()
  if (!orderList) {
    res.status(500).json({ success: false })
  }
  res.send(orderList)
})

module.exports = router
