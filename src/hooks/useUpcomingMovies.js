import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movie?.upcomingMovies);

  const getUpcomingMovies = async () => {
    try {
      const data = await fetch(
        "/3/movie/upcoming?language=en-US&page=1",
        API_OPTIONS,
      );

      if (!data.ok) {
        console.error("TMDB API error:", data.status);
        return;
      }

      const json = await data.json();
      if (json?.results) {
        dispatch(addUpcomingMovies(json.results));
      }
    } catch (error) {
      console.error(
        "Failed to fetch upcoming movies. Disable ad-blocker for localhost or whitelist this site.",
        error,
      );
    }
  };

  useEffect(() => {
    // getUpcomingMovies() this is wrong way, because it will make a api call again and again, if the data is already present in the store
    !upcomingMovies && getUpcomingMovies(); // memoization, before re-rendering the component, check if the upcomingMovies is not null, if it is not null, then don't call the function again(why to make a api call again and again, if the data is already present in the store)
  }, []);
};

export default useUpcomingMovies;
