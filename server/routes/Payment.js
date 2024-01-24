// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payment")
const { auth, isSeller } = require("../middlewares/auth")
router.post("/capturePayment", auth, isSeller, capturePayment)
router.post("/verifyPayment",auth, isSeller, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isSeller, sendPaymentSuccessEmail);

module.exports = router