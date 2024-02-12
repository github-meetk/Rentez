const BASE_URL = "http://localhost:4000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_SELLERS_LISTINGS: BASE_URL + "/profile/getSellerListings" ,
  GET_REVIEWS: BASE_URL + "/profile/getRatingsAndReviews",
  CREATE_REVIEWS : BASE_URL + "/profile/createRatingAndReview"
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  PLAN_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  PLAN_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// PROPERTY ENDPOINTS
export const propertyEndpoints = {
  GET_ALL_LISTINGS_API: BASE_URL + "/property/getAllListings",
  CREATE_LISTING_API: BASE_URL + "/property/createListing",
  GET_PROPERTY_DETAIL_API: BASE_URL + "/property/getPropertyDetail",
  DELETE_LISTING_API: BASE_URL + "/property/deleteListing",
  NOTIFY_SELLER_API : BASE_URL + "/property/notifySeller",
  CREATE_WISHLIST : BASE_URL + "/property/createWishlist",
  DELETE_WISHLIST : BASE_URL + "/property/deleteList",
  GET_WISHLIST : BASE_URL + "/property/getWishlist",
  CLEAR_WISHLIST : BASE_URL + "/property/clearWishlist"
}

// RATINGS AND REVIEWS
// export const ratingsEndpoints = {
//   REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
// }

// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}