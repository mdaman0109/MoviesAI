import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Utils/userSlice"
import moviesReducer from "../Utils/moviesSlice"
import aiReducer from"../Utils/AISearchSlice"
import configReducer from "../Utils/configSlice"
const appStore = configureStore({
reducer:{user:userReducer,
    movies:moviesReducer,
    ai:aiReducer,
    config:configReducer,
}

})
export default appStore;