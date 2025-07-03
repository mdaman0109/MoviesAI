import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Utils/userSlice"
const appStore = configureStore({
reducer:{user:userReducer}

})
export default appStore;