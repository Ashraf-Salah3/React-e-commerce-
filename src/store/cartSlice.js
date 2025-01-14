import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  productData: localStorage.getItem("productData")
    ? JSON.parse(localStorage.getItem("productData"))
    : [],
  cartTotalQuantity: 0,
};

const updateLocalStorage = (productData) => {
  localStorage.setItem("productData", JSON.stringify(productData));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,

  reducers: {
    ADD_TO_CART: (state, action) => {
      const existingItemIndex = state.productData.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
    
      if (existingItemIndex !== -1) {
        state.productData[existingItemIndex].quantity += 1;

          toast.info(` تم زياده ${action.payload.name}بنجاح `)
      } else {
        state.productData.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
        toast.success(` تم اضافه ${action.payload.name} الي السله بنجاح`)
      }

      updateLocalStorage(state.productData);
      state.cartTotalQuantity = state.productData.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    DECREASE_CART: (state, action) => {
      const productIndex = state.productData.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex !== -1) {
        if (state.productData[productIndex].quantity > 1) {
          state.productData[productIndex].quantity -= 1;
        } else {
          // Remove the item from the cart if quantity is 1
          state.productData = state.productData.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }

      updateLocalStorage(state.productData);
    },

    REMOVE_FROM_CART: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item.id !== action.payload.id
      );
      toast.error(` تم ازاله ${action.payload.name} من السله بنجاح`)
      updateLocalStorage(state.productData);
    },

    CLEAR_CART: (state) => {
      state.productData = [];
      updateLocalStorage(state.productData);
    },

    CALCULATE_TOTAL_QUANTITY: (state) => {
      state.cartTotalQuantity = state.productData.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
  },
});

export const {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREASE_CART,
  CLEAR_CART,
  CALCULATE_TOTAL_QUANTITY,
} = cartSlice.actions;

export default cartSlice.reducer;
