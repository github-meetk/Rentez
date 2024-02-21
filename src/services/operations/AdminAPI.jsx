import { apiConnector } from "../apiconnector";

const { GET_ALL_DETAILS} = adminEndpoints;

export const getAllDetails = async(token) => {
    try {
        const response = await apiConnector("GET", GET_ALL_DETAILS, null, {
            Authorization: `Bearer ${token}`,
          });
        if(!response.data.success){
            throw new Error("Could Not fetch details")
        }

        return response;
    } catch (error) {
        console.log(error);
    }
}