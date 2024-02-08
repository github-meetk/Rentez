import {configureStore} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import filterSlice from "../slices/filterSlice";
import cartSlice from "../slices/cartSlice";

const store  = configureStore({
    reducer : {
        auth: authReducer,
        profile : profileReducer,
        filter : filterSlice,
        cart : cartSlice,
    },
})

export default store