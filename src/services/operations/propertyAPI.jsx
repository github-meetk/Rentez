import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import {profileEndpoints, propertyEndpoints} from '../apis';

const { GET_ALL_LISTINGS_API , CREATE_LISTING_API, GET_PROPERTY_DETAIL_API, NOTIFY_SELLER_API, DELETE_LISTING_API } = propertyEndpoints;
const { GET_SELLERS_LISTINGS } = profileEndpoints;

export const getAllProperty = async(filterData) => {
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_LISTINGS_API, null, null, filterData);

        if(!response.data.success){
            throw new Error("Could Not fetch Featured Properties")
        }
        result = response.data.data;
    } catch (error) {
        console.log(error);
    }
    return result;
}

export const getSellersListings = async(token) => {
    let result = [];
    try {
        const response = await apiConnector("GET", GET_SELLERS_LISTINGS, null, {
            Authorization: `Bearer ${token}`,
          });
        if(!response?.data.success){
            throw new Error("Could Not fetch Seller's listings")
        }
        result = response.data.data;
    } catch (error) {
        toast.error(error.response?.data?.message);
        console.log(error);
    }

    return result;
}

export const createListings = async(token ,formData) => {
    // return async (dispatch) => {
        try {
            // dispatch(setLoading(true));
            const response = await apiConnector("POST", CREATE_LISTING_API, formData, {
                Authorization: `Bearer ${token}`,
              });

            if(!response?.data.success){
                throw new Error("Could not create Listings");
            }

            console.log(response?.data?.data);
            // dispatch(setLoading(false));
            toast.success("Listing Added Successfully");

        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    // }
}

export const getPropertyDetail = async(propertyId) => {
    let result;
    try {
        const response = await apiConnector("POST", GET_PROPERTY_DETAIL_API, {propertyId});

        if(!response?.data.success){
            throw new Error("Could not Fetch Data");
        }
        result = response?.data?.data;
        // console.log(response?.data?.data);
    } catch (error) {
        toast.error(error);
        console.log(error);
    }
    return result;
}

export const notifySeller = async(sellerEmail, custEmail, fullName, contactNumber, msg) => {
        const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", NOTIFY_SELLER_API, {
            sellerEmail, 
            custEmail, 
            fullName, 
            contactNumber, 
            msg
        } );

        if(!response?.data.success){
            throw new Error("Could not Send Data");
        }
        
        toast.success("Your Data sent Successfully")

        
    } catch (error) {
        toast.error(error);
        console.log(error);
    }
    toast.dismiss(toastId);
}

export function deleteProperty(token, propertyId) {
    return async (dispatch) => {
      // const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("DELETE", DELETE_LISTING_API, {propertyId}, {
          Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Listing Deleted Successfully")
        // dispatch(logout(navigate))
      } catch (error) {
        console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Property")
      }
      // toast.dismiss(toastId)
    }
  }