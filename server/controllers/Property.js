const Property = require("../models/Property");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mailSender = require("../utils/mailSender");
const { NewInquiry } = require("../mail/templates/NewInquiry");

exports.createListing = async (req, res) => {
  try {
    const userId = req.user.id;

    let {
      propertyType,
      bhk,
      size,
      bathrooms,
      price,
      pricePer,
      description,
      city,
      state,
      pincode,
      address,
    } = req.body;

    const thumbnail = req.files.thumbnail;

    const photos = req.files.photos;

    if (
      !propertyType ||
      !size ||
      !price ||
      !pricePer ||
      !description ||
      !city ||
      !state ||
      !pincode ||
      !address ||
      !thumbnail ||
      !photos
    ) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Mandatory Details",
      });
    }

    const sellerDetails = await User.findById(userId);
    console.log(sellerDetails);
    if (sellerDetails.accountType !== "Seller") {
      return res.status(404).json({
        success: false,
        message: "Only Seller can add Listing",
      });
    }

    if (
      sellerDetails.subscriptionExpires.getTime() <=
      new Date(Date.now()).getTime()
    ) {
      return res.status(404).json({
        success: false,
        message: "You have not Purchased our Subsciption!! Please Subscribe",
      });
    }

    if (sellerDetails.planType === "Standard") {
      if (sellerDetails.properties.length >= 20) {
        return res.status(404).json({
          success: false,
          message: "You have Reached your Limit",
        });
      }
    } else if (sellerDetails.planType === "Premium") {
      if (sellerDetails.properties.length >= 50) {
        return res.status(404).json({
          success: false,
          message: "You have Reached your Limit",
        });
      }
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    let images = [];
    for (let i = 0; i < photos.length; i++) {
      var photo = await uploadImageToCloudinary(
        photos[i],
        process.env.FOLDER_NAME
      );
      images.push(`${photo.secure_url}`);
    }

    const newProperty = await Property.create({
      propertyType,
      bhk,
      size,
      bathrooms,
      price,
      pricePer,
      description,
      city,
      state,
      pincode,
      address,
      thumbnail: thumbnailImage.secure_url,
      photos: images,
      seller: userId,
    });

    await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          properties: newProperty._id,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: newProperty,
      message: "Property Listed Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to List Property",
      error: error.message,
    });
  }
};

exports.getAllListings = async (req, res) => {
  try {
    const { propertyType, bhk, bathrooms, city, state, priceMin, priceMax } =
      req.query;

    let queryObject = {};

    if (priceMin || priceMax) {
      queryObject.price = {};
      if (priceMin) queryObject.price.$gte = parseFloat(priceMin);
      if (priceMax) queryObject.price.$lte = parseFloat(priceMax);
    }

    if (propertyType) {
      queryObject.propertyType = { $in: propertyType };
    }

    if (bhk) {
      queryObject.bhk = { $eq: bhk };
    }
    if (bathrooms) {
      queryObject.bathrooms = { $eq: bathrooms };
    }
    if (city) {
      queryObject.city = { $regex: city, $options: "i" };
    }
    if (state) {
      queryObject.state = { $regex: state, $options: "i" };
    }
    // console.log(queryObject);

    const properties = await Property.find(queryObject)
      // .populate("seller")
      // .exec();

    return res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Properties Data`,
      error: error.message,
    });
  }
};

exports.getPropertyDetail = async (req, res) => {
  try {
    const { propertyId } = req.body;
    // console.log(propertyId)
    const propertyDetails = await Property.findOne({
      _id: propertyId,
    })
      .populate({
        path: "seller",
        populate: {
          path: "additionalDetails",
        },
      })
      .exec();

    if (!propertyDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find Property with id: ${propertyId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: propertyDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const userId = req.user.id;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Listing not found" });
    }

    await Property.findByIdAndDelete(propertyId);

    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { properties: propertyId } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting listing",
      error: error.message,
    });
  }
};

exports.notifySeller = async (req, res) => {
  try {
    // Get email and password from request body
    // const userId = req.user.id;
    // console.log(id)

    // const user = await User.findOne({userId});

    const { fullName, custEmail, sellerEmail, contactNumber, msg } = req.body;

    // Check if email or password is missing
    if (!custEmail || !fullName || !contactNumber || !msg || !sellerEmail) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    // Send notification email
    try {
      const emailResponse = await mailSender(
        sellerEmail,
        "New inquiry Alert",
        NewInquiry(custEmail, `${fullName}`, `${contactNumber}`, `${msg}`)
      );
      // console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Successfully sent the details to seller!!",
    });
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Failed Please Try Again`,
    });
  }
};

exports.deleteWishlist = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const userId = req.user.id;

    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { wishlist: propertyId } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Listing removed successfully from wishlist",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createWishlist = async (req, res) => {
  try {
    const {
      propertyId,
    } = req.body;

    const userId = req.user.id

    const response = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          wishlist : propertyId,
        },
      },
      { new: true }
    );

    const propertyDetails = await Property.findOne({_id : propertyId})

    res.status(200).json({
      success: true,
      propertyDetails,
      message: "Property Added in WishList Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.getUserWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const List = await User.findOne({_id : userId}).populate("wishlist").exec()

    return res.status(200).json({
      success: true,
      data: List,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.clearWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { wishlist: [] } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};