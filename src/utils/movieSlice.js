import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    removeNowPlayingMovies: (state) => {
      state.nowPlayingMovies = null;
    },
  },
});

export const { addNowPlayingMovies, removeNowPlayingMovies } = movieSlice.actions;
export default movieSlice.reducer;
