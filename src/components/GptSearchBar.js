import { useSelector } from "react-redux";
import languageConstant from "../utils/languageConstant";
import { useRef } from "react";
// import openai from "../utils/openAI";
import { API_OPTIONS } from "../utils/constant";

const GptSearchBar = () => {
  const lang = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        `/3/search/movie?query=${encodeURIComponent(movie.trim())}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS,
      );

      if (!data.ok) {
        console.error(`TMDB search failed for "${movie}":`, data.status);
        return [];
      }

      const json = await data.json();
      return json.results ?? [];
    } catch (error) {
      console.error(`TMDB search error for "${movie}":`, error);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    // const gptQuery =
    //   "I want you to act as a movie recommendation system and suggest some movies based on the user's query. " +
    //   searchText.current.value +
    //   ". Only return me names of 5 movies, comma separated, like given in the example ahead. Example: Golmal, Bhagham Bhag, Bhool Bhulaiyaa, Welcome, Hera Pheri";

    // Make an api call to the OpenAI API to get the search results
    // const gptSearchResults = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [{ role: "user", content: gptQuery }],
    // });

    // if (!gptSearchResults.choices)
    //   throw new Error("No search results found. Please try again.");

    // console.log(gptSearchResults.choices?.[0]?.message?.content);
    // 3 Idiots, Hera Pheri, Bhool Bhulaiyaa, Welcome, Golmaal

    // const getMovies = gptSearchResults.choices?.[0]?.message?.content.split(",");

    const MOCK_GPT_MOVIES = "3 Idiots, Hera Pheri, Bhool Bhulaiyaa, Welcome, Golmaal, Cocktail";

    const getMovies = MOCK_GPT_MOVIES.split(",").map((movie) => movie.trim());
    console.log("Mock GPT movies:", getMovies);

    // const promiseArray = getMovies.map((movie) => searchMovieTMDB(movie));
    // As searchMovieTMDB is an async function, we need to wait for all the promises(5 in this case) to resolve using Promise.all
    // const tmdbMovies = await Promise.all(promiseArray);

    // for each movie, search TMDB one at a time (avoids proxy timeouts)
    const tmdbMovies = [];
    for (const movie of getMovies) {
      const results = await searchMovieTMDB(movie);
      tmdbMovies.push(results);
    }
    console.log(tmdbMovies);
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="items-center gap-4 w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-2 rounded-lg border border-gray-300 font-bold text-lg col-span-10 bg-white text-black placeholder:text-gray-500"
          placeholder={languageConstant[lang].placeholder}
        />
        <button
          className="px-4 py-2 bg-red-700 text-white rounded-lg border border-gray-300 font-bold text-lg col-span-2"
          onClick={handleGptSearchClick}
        >
          {languageConstant[lang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
