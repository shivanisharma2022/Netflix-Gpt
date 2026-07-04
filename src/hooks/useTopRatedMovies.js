import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTopRatedMovies } from "../utils/movieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movie?.topRatedMovies);

  const getTopRatedMovies = async () => {
    try {
      const data = await fetch(
        "/3/movie/top_rated?language=en-US&page=1",
        API_OPTIONS,
      );

      if (!data.ok) {
        console.error("TMDB API error:", data.status);
        return;
      }

      const json = await data.json();
      if (json?.results) {
        dispatch(addTopRatedMovies(json.results));
      }
    } catch (error) {
      console.error(
        "Failed to fetch top rated movies. Disable ad-blocker for localhost or whitelist this site.",
        error,
      );
    }
  };

  useEffect(() => {
    // getTopRatedMovies() this is wrong way, because it will make a api call again and again, if the data is already present in the store
    !topRatedMovies && getTopRatedMovies(); // memoization, before re-rendering the component, check if the topRatedMovies is not null, if it is not null, then don't call the function again(why to make a api call again and again, if the data is already present in the store)
  }, []);
};

export default useTopRatedMovies;
