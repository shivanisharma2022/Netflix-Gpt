import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movie?.trailerVideo);

  const getMovieVideos = async () => {
    const data = await fetch(
      `/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS,
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    // getMovieVideos() this is wrong way, because it will make a api call again and again, if the data is already present in the store
    !trailerVideo && getMovieVideos(); // memoization, before re-rendering the component, check if the trailerVideo is not null, if it is not null, then don't call the function again(why to make a api call again and again, if the data is already present in the store)
  }, []);
};

export default useMovieTrailer;
