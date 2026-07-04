import { useSelector } from "react-redux";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { NETFLIX_BACKGROUND } from "../utils/constant";

const GptSearch = () => {
  const movieNames = useSelector((store) => store.gpt.movieNames);
  const hasResults = movieNames?.length > 0;

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <img
          src={NETFLIX_BACKGROUND}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
      <GptSearchBar />
      {hasResults && <GptMovieSuggestions />}
    </div>
  );
};

export default GptSearch;
