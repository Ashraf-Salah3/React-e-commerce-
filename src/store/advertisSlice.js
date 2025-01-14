import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axios";

const initialState = {
  stories: [],
  ads: [],
  news: [],
  storyStatus: null,
  advertsStatus: null,
  newsStatus: null,
};

export const fetchStories = createAsyncThunk(
  "story/fetchStories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/Story");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAdvertises = createAsyncThunk(
  "advertis/fetchAdvertises",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/Advertisment");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/News");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const advertisSlice = createSlice({
  name: "advertis",
  initialState,
  extraReducers: (builder) => {
    builder
      // Stories
      .addCase(fetchStories.pending, (state) => {
        state.storyStatus = "loading";
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.storyStatus = "succeeded";
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state) => {
        state.storyStatus = "failed";
      })

      // Advertises
      .addCase(fetchAdvertises.pending, (state) => {
        state.advertsStatus = "loading";
      })
      .addCase(fetchAdvertises.fulfilled, (state, action) => {
        state.advertsStatus = "succeeded";
        state.ads = action.payload;
      })
      .addCase(fetchAdvertises.rejected, (state) => {
        state.advertsStatus = "failed";
      })

      //News
      .addCase(fetchNews.pending, (state) => {
        state.newsStatus = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.newsStatus = "faild";
      });
  },
});

export default advertisSlice.reducer;
