import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  //const [trailerId, setTrailerId] = useState(null);
  // why use useState, when we have redux store

  const dispatch = useDispatch();
  const getMovieVideo = async () => {
    const data = await fetch(
      `/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS,
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailerVideo = filterData.length ? filterData[0] : json.results[0];

    //setTrailerId(trailerVideo.key);

    dispatch(addTrailerVideo(trailerVideo));
  };

  useEffect(() => {
    getMovieVideo();
  }, []);
};

export default useMovieTrailer;
