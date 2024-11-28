import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  isLoadingCategories: false,
  isLoadingEvents: false,
  events: [],
  articles: [],
  directories: [],
  promos: [],
  imagesJumbotron: [],
  isLoadingImagesJumbotron: false,
  isLoadingArticles: false,
  isLoadingPromos: false,
  isLoadingDirectory: false,
  isLoadingArticles: false,
};

export const fetchImagesJumbotron = createAsyncThunk(
  "directory/fetchImagesJumbotron",
  async () => {
    const response = await axios.get(
      "http://localhost:3001/api/v1/cms/jumbotron"
    );
    return response?.data?.data?.images;
  }
);

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
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
        },
      }
    );
    return response?.data?.data;
  }
);

export const fetchArticles = createAsyncThunk(
  "directory/fetchArticles",
  async () => {
    const response = await axios.get(
      "http://localhost:3001/api/v1/cms/articles"
    );
    return response?.data?.data;
  }
);

export const fetchPromo = createAsyncThunk("directory/fetchPromo", async () => {
  const response = await axios.get("http://localhost:3001/api/v1/cms/promos");
  return response?.data?.data;
});

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
    setJumbotronImages: (state, action) => {
      state.imagesJumbotron = [...state.imagesJumbotron, action.payload];
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

    // Fetch Promo Cases
    builder
      .addCase(fetchPromo.pending, (state) => {
        state.isLoadingPromos = true;
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.isLoadingPromos = false;
        state.promos = action.payload;
      })
      .addCase(fetchPromo.rejected, (state) => {
        state.isLoadingPromos = false;
      });

    // Fetch Articles Cases
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoadingArticles = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoadingArticles = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.isLoadingArticles = false;
      });

    // Fetch Images Jumbotron Cases
    builder
      .addCase(fetchImagesJumbotron.pending, (state) => {
        state.isLoadingImagesJumbotron = true;
      })
      .addCase(fetchImagesJumbotron.fulfilled, (state, action) => {
        state.isLoadingImagesJumbotron = false;
        state.imagesJumbotron = action.payload;
      })
      .addCase(fetchImagesJumbotron.rejected, (state) => {
        state.isLoadingImagesJumbotron = false;
      });
  },
});

export const { setLoadingDirectory, setJumbotronImages } =
  directorySlice.actions;

export default directorySlice.reducer;
