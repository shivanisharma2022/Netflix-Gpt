import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="w-28 sm:w-36 md:w-44 lg:w-48 pr-2 sm:pr-4 flex-shrink-0">
      <img className="w-full" alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
