import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
};

export const fetchCategories = createAsyncThunk(
  "directory/fetchCategories",
  async () => {
    const response = await axios.get(
      "http://localhost:3001/api/v1/cms/categories"
    );
    return response?.data?.data;
  }
);

const directorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "idle";
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default directorySlice.reducer;
