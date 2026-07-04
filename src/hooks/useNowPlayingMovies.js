import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movie?.nowPlayingMovies,
  );

  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(
        "/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS,
      );

      if (!data.ok) {
        console.error("TMDB API error:", data.status);
        return;
      }

      const json = await data.json();
      if (json?.results) {
        dispatch(addNowPlayingMovies(json.results));
      }
    } catch (error) {
      console.error(
        "Failed to fetch movies. Disable ad-blocker for localhost or whitelist this site.",
        error,
      );
    }
  };

  useEffect(() => {
    // getNowPlayingMovies() this is wrong way, because it will make a api call again and again, if the data is already present in the store
    !nowPlayingMovies && getNowPlayingMovies(); // memoization, before re-rendering the component, check if the nowPlayingMovies is not null, if it is not null, then don't call the function again(why to make a api call again and again, if the data is already present in the store)
  }, []);
};

export default useNowPlayingMovies;
