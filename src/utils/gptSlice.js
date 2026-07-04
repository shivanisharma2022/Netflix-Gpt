import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieNames: [],
    movieResults: [],
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
      state.movieNames = [];
      state.movieResults = [];
    },
    addGptMovies: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    clearGptMovies: (state) => {
      state.movieNames = [];
      state.movieResults = [];
    },
    resetGptState: (state) => {
      state.showGptSearch = false;
      state.movieNames = [];
      state.movieResults = [];
    },
  },
});

export const { toggleGptSearch, addGptMovies, clearGptMovies, resetGptState } =
  gptSlice.actions;
export default gptSlice.reducer;
