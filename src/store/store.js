import { configureStore } from "@reduxjs/toolkit";
import addToCartReducer from "../components/addToCart/addToCartSlice";

export const store = configureStore({
    reducer:{
        cart: addToCartReducer
    }
})