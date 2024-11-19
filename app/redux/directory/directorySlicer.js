import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  isLoadingCategories: false,
  isLoadingEvents: false,
  events: [],
  directories: [],
  isLoadingDirectory: false,
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

export const fetchDirectories = createAsyncThunk(
  "directory/fetchDirectories",
  async () => {
    const response = await axios.get(
      "http://localhost:3001/api/v1/cms/directory",
      {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      }
    );
    return response?.data?.data;
  }
);

export const fetchEvents = createAsyncThunk(
  "directory/fetchEvents",
  async () => {
    const response = await axios.get("http://localhost:3001/api/v1/cms/events");
    return response?.data?.data;
  }
);

const directorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {
    setLoadingDirectory: (state, action) => {
      state.isLoadingDirectory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories Cases
      .addCase(fetchCategories.pending, (state) => {
        state.isLoadingCategories = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoadingCategories = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoadingCategories = false;
      })

      // Fetch Events Cases
      .addCase(fetchEvents.pending, (state) => {
        state.isLoadingEvents = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoadingEvents = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.isLoadingEvents = false;
      })

      // Fetch Directories Cases
      .addCase(fetchDirectories.pending, (state) => {
        state.isLoadingDirectory = true;
      })
      .addCase(fetchDirectories.fulfilled, (state, action) => {
        state.isLoadingDirectory = false;
        state.directories = action.payload;
      })
      .addCase(fetchDirectories.rejected, (state) => {
        state.isLoadingDirectory = false;
      });
  },
});

export const { setLoadingDirectory } = directorySlice.actions;

export default directorySlice.reducer;
