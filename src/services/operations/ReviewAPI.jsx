import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";

const { CREATE_REVIEWS, GET_REVIEWS} = profileEndpoints;

export const createReview = async(token, formData) => {
    try {
        const response = await apiConnector("POST", CREATE_REVIEWS, formData, {
            Authorization: `Bearer ${token}`,
        });

        if(!response?.data.success){
            throw new Error("Could not submit Feedback");
        }

    } catch (error) {
        toast.error(error.response?.data.message);
        console.log(error);
    }
}

export const getAllReviews= async() => {
    let result = [];
    try {
        const response = await apiConnector("GET", GET_REVIEWS);

        if(!response.data.success){
            throw new Error("Could Not fetch Ratings And Reviews")
        }
        result = response;
    } catch (error) {
        console.log(error);
    }
    return result;
}