import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movie = useSelector((store) => store.movie);

  return (
    movie?.nowPlayingMovies && (
      <div className="bg-black pb-20">
        <div className="mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">
          <MovieList title="Now Playing" movies={movie.nowPlayingMovies} />
          <MovieList title="Popular" movies={movie.popularMovies} />
          <MovieList title="Top Rated" movies={movie.topRatedMovies} />
          <MovieList title="Upcoming" movies={movie.upcomingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
