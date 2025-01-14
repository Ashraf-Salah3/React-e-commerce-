import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoriteReducer from "./favoriteSlice";
import advertisReducer from "./advertisSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorite: favoriteReducer,
    advertis: advertisReducer,
  },
});

export default store;
