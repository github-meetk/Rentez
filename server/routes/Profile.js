const express = require("express")
const router = express.Router()
const { auth, isSeller } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getSellerListings,
  getRatingsAndreviews,
  createRatingAndReview
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

// Get Enrolled Courses
router.get("/getSellerListings",auth, isSeller, getSellerListings)

// Rating And Review 
router.get("/getRatingsAndReviews", getRatingsAndreviews)
router.post("/createRatingAndReview", auth, createRatingAndReview)

module.exports = router