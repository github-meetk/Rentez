import {configureStore} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import filterSlice from "../slices/filterSlice";

const store  = configureStore({
    reducer : {
        auth: authReducer,
        profile : profileReducer,
        filter : filterSlice,
    },
})

export default store