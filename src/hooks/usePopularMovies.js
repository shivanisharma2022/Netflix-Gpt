import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movie?.popularMovies);

  const getPopularMovies = async () => {
    try {
      const data = await fetch(
        "/3/movie/popular?language=en-US&page=1",
        API_OPTIONS,
      );

      if (!data.ok) {
        console.error("TMDB API error:", data.status);
        return;
      }

      const json = await data.json();
      if (json?.results) {
        dispatch(addPopularMovies(json.results));
      }
    } catch (error) {
      console.error(
        "Failed to fetch popular movies. Disable ad-blocker for localhost or whitelist this site.",
        error,
      );
    }
  };

  useEffect(() => {
    // getPopularMovies() this is wrong way, because it will make a api call again and again, if the data is already present in the store
    !popularMovies && getPopularMovies(); // memoization, before re-rendering the component, check if the popularMovies is not null, if it is not null, then don't call the function again(why to make a api call again and again, if the data is already present in the store)
  }, []);
};

export default usePopularMovies;
