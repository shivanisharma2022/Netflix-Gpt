import { useDispatch, useSelector } from "react-redux";
import languageConstant from "../utils/languageConstant";
import { useRef } from "react";
// import openai from "../utils/openAI";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovies, clearGptMovies } from "../utils/gptSlice";

const GptSearchBar = () => {
  const lang = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
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

  const handleSearchChange = () => {
    if (!searchText.current.value.trim()) {
      dispatch(clearGptMovies());
    }
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query) {
      dispatch(clearGptMovies());
      return;
    }

    console.log(query);

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
    // 3 Idiots, Hera Pheri, Bhool Bhulaiyaa, Golmaal, Cocktail

    // const getMovies = gptSearchResults.choices?.[0]?.message?.content.split(",");

    const MOCK_GPT_MOVIES =
      "3 Idiots, Bhool Bhulaiyaa, Golmaal, Cocktail, Housefull, Yeh Jawaani Hai Deewani, Love Aaj Kal, Tu Jhoothi Main Makkaar, Happy New Year, 2 States, Rocky Aur Rani Kii Prem Kahaani, Stree";

    const getMovies = MOCK_GPT_MOVIES.split(",").map((movie) => movie.trim());
    console.log("Mock GPT movies:", getMovies);

    // const promiseArray = getMovies.map((movie) => searchMovieTMDB(movie));
    // As searchMovieTMDB is an async function, we need to wait for all the promises(5 in this case) to resolve using Promise.all
    // const tmdbMovies = await Promise.all(promiseArray);

    const tmdbMovies = [];
    for (const movie of getMovies) {
      const results = await searchMovieTMDB(movie);
      tmdbMovies.push(results);
    }
    console.log(tmdbMovies);

    dispatch(addGptMovies({ movieNames: getMovies, movieResults: tmdbMovies }));
  };

  return (
    <div className="pt-[18%] sm:pt-[12%] md:pt-[10%] flex justify-center px-4">
      <form
        className="w-full max-w-3xl flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 sm:items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          onChange={handleSearchChange}
          className="p-3 sm:p-2 rounded-lg border border-gray-300 font-bold text-base sm:text-lg sm:col-span-10 bg-white text-black placeholder:text-gray-500 w-full"
          placeholder={languageConstant[lang].placeholder}
        />
        <button
          className="px-4 py-3 sm:py-2 bg-red-700 text-white rounded-lg border border-gray-300 font-bold text-base sm:text-lg sm:col-span-2 w-full sm:w-auto"
          onClick={handleGptSearchClick}
        >
          {languageConstant[lang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
