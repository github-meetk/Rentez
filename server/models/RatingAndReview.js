const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    rating : {
        required : true,
        type : Number,
    },
    review : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);