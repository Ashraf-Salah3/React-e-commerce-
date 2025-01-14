import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteData: localStorage.getItem("favoriteData")
    ? JSON.parse(localStorage.getItem("favoriteData"))
    : [],
};

const updateLocalStorage = (favoriteData) => {
  localStorage.setItem("favoriteData", JSON.stringify(favoriteData));
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    ADD_TO_FAVORITE: (state, action) => {
      const existingItemIndex = state.favoriteData.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex === -1) {
        state.favoriteData.push(action.payload);
        updateLocalStorage(state.favoriteData);
      }
    },
    REMOVE_FROM_FAVORITE: (state, action) => {
      state.favoriteData = state.favoriteData.filter(
        (item) => item.id !== action.payload.id
      );
      updateLocalStorage(state.favoriteData);
    },
  },
});

export const { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } = favoriteSlice.actions;

export default favoriteSlice.reducer;

