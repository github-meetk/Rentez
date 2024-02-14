const { instance } = require("../config/razorpay")
const Property = require("../models/Property")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/ paymentSuccessEmail")

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const userId = req.user.id
  // console.log(userId)
  const {plan} = req.body;
  if (!userId) {
    return res.json({ success: false, message: "Please Provide User ID" })
  }

  let total_amount = plan;

    try {
        const user = await User.findOne({_id : userId});
      if (user.subscriptionExpires.getTime() > new Date(Date.now()).getTime()) {
        return res
          .status(200)
          .json({ success: false, message: "You are already subscribed!!" })
      }

    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error })
    }
  
  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    // console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const plan = req.body?.plan
  const planType = req.body?.planType;
  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !plan ||
    !planType ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Detail not found" })
  }

  let day;

  if(plan <= 1499){
    day = 29;
  }
  else {
    day = 365
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    try {
      var date = new Date(Date.now());
      date.setDate(date.getDate() + day);

        const user = await User.findOneAndUpdate({ _id : userId}, { subscriptionExpires : date, planType }, { new : true })

        const emailResponse = await mailSender(
            user.email,
            `Successfully Subscribed into Rentez`,
            courseEnrollmentEmail(
              "Rentez plan",
              `${user.firstName} ${user.lastName}`
            )
          )
    
          // console.log("Email sent successfully: ", emailResponse.response)/
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
    }
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const user = await User.findById(userId)

    await mailSender(
      user.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${user.firstName} ${user.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send payment receiving email" })
  }
}

