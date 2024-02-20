const express = require("express")
const { getAdminDetails } = require("../controllers/Admin")
const router = express.Router()

router.get("/adminDetails", getAdminDetails)

module.exports = router