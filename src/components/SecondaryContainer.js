import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movie = useSelector((store) => store.movie);

  return (
    movie?.nowPlayingMovies && (
      <div className="bg-black">
        <div className="mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">
          <MovieList title="Now Playing" movies={movie.nowPlayingMovies} />
          <MovieList title="Trending" movies={movie.nowPlayingMovies} />
          <MovieList title="Top Rated" movies={movie.nowPlayingMovies} />
          <MovieList title="Upcoming" movies={movie.nowPlayingMovies} />
          <MovieList title="Popular" movies={movie.nowPlayingMovies} />
          <MovieList title="Horror" movies={movie.nowPlayingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
