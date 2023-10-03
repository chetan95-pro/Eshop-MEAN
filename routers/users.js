const { User } = require("../models/category")
const express = require("express")
const router = express.Router()

//with the help for async and await method.
router.get(`/`, async (req, res) => {
  const userList = await User.find()
  if (!userList) {
    res.status(500).json({ success: false })
  }
  res.send(userList)
})

module.exports = router
