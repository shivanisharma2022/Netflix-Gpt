import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movie = useSelector((store) => store.movie?.nowPlayingMovies);

  if (!movie) return null;

  const mainMovie = movie[0];

  const { original_title, overview, id } = mainMovie;
  console.log(original_title, overview, id);

  return (
    <div className="relative">
      <VideoBackground movieId={id} />
      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;
