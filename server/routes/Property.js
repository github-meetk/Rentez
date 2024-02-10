const express = require("express")
const router = express.Router()

const { auth, isSeller } = require("../middlewares/auth")

const {createListing, getAllListings, getPropertyDetail, deleteListing, notifySeller, createWishlist, getUserWishlist, deleteWishlist, clearWishlist} = require("../controllers/Property")

router.post("/createListing", auth, isSeller, createListing);

router.get("/getAllListings", getAllListings);

router.post("/getPropertyDetail", getPropertyDetail);

router.delete("/deleteListing", auth, isSeller, deleteListing);

router.post("/notifySeller", notifySeller);

router.get("/getWishlist", auth, getUserWishlist);

router.post("/createWishlist", auth, createWishlist);

router.delete("/deleteList", auth, deleteWishlist);

router.delete("/clearWishlist", auth, clearWishlist);

module.exports = router;