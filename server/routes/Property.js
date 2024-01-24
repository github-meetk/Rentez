const express = require("express")
const router = express.Router()

const { auth, isSeller } = require("../middlewares/auth")

const {createListing, getAllListings, getPropertyDetail, deleteListing, notifySeller} = require("../controllers/Property")

router.post("/createListing", auth, isSeller, createListing);

router.get("/getAllListings", getAllListings);

router.post("/getPropertyDetail", getPropertyDetail);

router.delete("/deleteListing", auth, isSeller, deleteListing);

router.post("/notifySeller", notifySeller);

module.exports = router;